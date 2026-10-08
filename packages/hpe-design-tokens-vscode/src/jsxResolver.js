// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const typescript = require('typescript');
const { tokenNameFor } = require('./grommetAdapter');

const scriptKindForLanguage = languageId => {
  if (languageId === 'typescriptreact') return typescript.ScriptKind.TSX;
  if (languageId === 'javascriptreact') return typescript.ScriptKind.JSX;
  if (languageId === 'typescript') return typescript.ScriptKind.TS;
  return typescript.ScriptKind.JS;
};

const parentJsxAttribute = node => {
  let current = node.parent;
  while (current) {
    if (typescript.isJsxAttribute(current)) return current;
    current = current.parent;
  }
  return undefined;
};

const attributeName = node =>
  typescript.isIdentifier(node.name) ? node.name.text : undefined;

const componentNameForAttribute = (attribute, tokenComponents) => {
  const attributes = attribute.parent;
  const openingElement = attributes?.parent;
  const tagName = openingElement?.tagName;

  if (typescript.isIdentifier(tagName)) {
    return tokenComponents.named.get(tagName.text);
  }

  if (
    !typescript.isPropertyAccessExpression(tagName) ||
    !typescript.isIdentifier(tagName.expression) ||
    !typescript.isIdentifier(tagName.name)
  ) {
    return undefined;
  }

  const moduleName = tokenComponents.namespaces.get(tagName.expression.text);
  if (moduleName === 'grommet') return tagName.name.text;
  if (moduleName === '@hpe-design/icons-grommet') return 'Icon';

  return undefined;
};

const objectPropertyName = (node, attribute) => {
  const property = node.parent;
  if (
    !typescript.isPropertyAssignment(property) ||
    property.initializer !== node ||
    !typescript.isIdentifier(property.name) ||
    !typescript.isObjectLiteralExpression(property.parent) ||
    !typescript.isJsxExpression(attribute.initializer)
  ) {
    return undefined;
  }

  const { expression } = attribute.initializer;
  const isDirectObject = expression === property.parent;
  const isDirectArrayItem =
    typescript.isArrayLiteralExpression(expression) &&
    expression.elements.includes(property.parent);
  if (!isDirectObject && !isDirectArrayItem) return undefined;

  return property.name.text;
};

const tokenComponentNames = sourceFile => {
  const named = new Map();
  const namespaces = new Map();

  sourceFile.statements.forEach(statement => {
    if (
      !typescript.isImportDeclaration(statement) ||
      !['@hpe-design/icons-grommet', 'grommet'].includes(
        statement.moduleSpecifier.text,
      )
    ) {
      return;
    }

    const { namedBindings } = statement.importClause || {};
    if (typescript.isNamedImports(namedBindings)) {
      namedBindings.elements.forEach(element => {
        named.set(
          element.name.text,
          statement.moduleSpecifier.text === '@hpe-design/icons-grommet'
            ? 'Icon'
            : element.propertyName?.text || element.name.text,
        );
      });
    }

    if (typescript.isNamespaceImport(namedBindings)) {
      namespaces.set(namedBindings.name.text, statement.moduleSpecifier.text);
    }
  });

  return { named, namespaces };
};

const jsxValueContext = (node, sourceFile, tokenComponents) => {
  const attribute = parentJsxAttribute(node);
  if (!attribute) return undefined;

  const componentName = componentNameForAttribute(attribute, tokenComponents);
  const attributePropName = attributeName(attribute);
  const nestedPropertyName = objectPropertyName(node, attribute);
  const supportsNestedProperty = [
    'background',
    'border',
    'columns',
    'connections',
    'dropBackground',
    'height',
    'hoverIndicator',
    'width',
  ].includes(attributePropName);
  if (
    supportsNestedProperty &&
    typescript.isPropertyAssignment(node.parent) &&
    !nestedPropertyName
  ) {
    return undefined;
  }
  const propName =
    supportsNestedProperty && nestedPropertyName
      ? `${attributePropName}.${nestedPropertyName}`
      : attributePropName;
  if (!componentName || !propName) return undefined;

  return {
    componentName,
    end: node.getEnd() - 1,
    propName,
    start: node.getStart(sourceFile) + 1,
    value: node.text,
  };
};

const findJsxValueContextAtOffset = (text, offset, languageId) => {
  const sourceFile = typescript.createSourceFile(
    'document',
    text,
    typescript.ScriptTarget.Latest,
    true,
    scriptKindForLanguage(languageId),
  );
  const tokenComponents = tokenComponentNames(sourceFile);
  let context;

  const visit = node => {
    if (context || offset < node.getFullStart() || offset > node.getEnd()) {
      return;
    }

    if (typescript.isStringLiteral(node)) {
      const valueContext = jsxValueContext(node, sourceFile, tokenComponents);
      if (
        valueContext &&
        offset >= valueContext.start &&
        offset <= valueContext.end
      ) {
        context = valueContext;
        return;
      }
    }

    typescript.forEachChild(node, visit);
  };

  visit(sourceFile);
  return context;
};

const findJsxTokenAtOffset = (text, offset, languageId, tokenIndex) => {
  const context = findJsxValueContextAtOffset(text, offset, languageId);
  if (!context) return undefined;

  const name = tokenNameFor(
    context.componentName,
    context.propName,
    context.value,
  );
  if (!name) return undefined;
  const token = tokenIndex.byName.get(name);
  if (!token) return undefined;

  return {
    end: context.end,
    name,
    start: context.start,
    token,
  };
};

module.exports = { findJsxTokenAtOffset, findJsxValueContextAtOffset };
