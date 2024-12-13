/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  AccessibilityTable,
  AccessibilityTable1,
  AccessibilityTestView,
  ContentSection,
  Subsection,
} from '.';
import componentData from '../../data/wcag/components.json';

export const AccessibilitySection = ({ title }) => {
  const [data, setData] = useState();
  const [setErrorMessage] = useState();
  const [componentInfo, setComponentInfo] = useState();

  useEffect(() => {
    if (title && componentData) {
      const component = componentData.find(item => item[title.toLowerCase()]);
      setComponentInfo(component[title.toLowerCase()]);
    }
  }, [title]);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/w3c/wcag/refs/heads/main/guidelines/wcag.json',
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        return response.json();
      })
      .then(fetchedData => {
        setData(fetchedData);
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  }, [setErrorMessage]);

  const compareRules = () => {
    if (!componentInfo || !data) return [];

    // when comparing rules we need to find the rule in the data
    // then look at the first number in the rule to find the principle
    // we do this by always subtracting 1 from the rule number
    // then we find the guideline by splitting the rule number by '.'
    // and taking the second number and subtracting 1
    // this gives us the index of the guideline in the principles array
    // then we find the data in successcriteria array with the rule number

    const comparisons = componentInfo.map(rule => {
      const [principleNum, guidelineNum] = rule.rule
        .split('.')
        .map(num => parseInt(num, 10));

      const principleIndex = principleNum - 1;
      const principle = data.principles[principleIndex];

      const guideline = principle.guidelines[guidelineNum - 1];

      const successCriterion = guideline.successcriteria.find(
        criterion => criterion.num === rule.rule,
      );

      if (successCriterion) {
        const extractedData = {
          id: successCriterion.id.split(':')[1],
          num: successCriterion.num,
          // version comes in an array we need to find the highest
          version: successCriterion.versions
            ? Math.max(
                ...successCriterion.versions.map(version =>
                  parseFloat(version),
                ),
              )
            : undefined,
          level: successCriterion.level,
          handle: successCriterion.handle,
          title: successCriterion.title,
        };
        const { status } = rule;
        return {
          ...extractedData,
          status,
        };
      }
      // error
      return {
        rule: rule.rule,
        message: `Success criterion with num ${rule.rule} not found`,
      };
    });

    return comparisons;
  };

  const comparisons = compareRules();
  const statusData = comparisons.map(item => item.status);

  return (
    // not sure about this padding but without there is a huge
    // space from the last section on guidance accessibility
    // and this section. also if I use subsection with level 3
    // it renders the title as small
    <ContentSection pad={{ top: 'small' }}>
      <Subsection name="WCAG compliance">
        <AccessibilityTable1 statuses={statusData} />
        <AccessibilityTable statuses={statusData} />
        <AccessibilityTestView rules={comparisons} />
      </Subsection>
    </ContentSection>
  );
};
