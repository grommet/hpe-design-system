/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from 'react';
import {
  AccessibilityTable,
  AccessibilityTable1,
  AccessibilityTestView,
  ContentSection,
} from '.';
import componentData from '../../data/wcag/components.json';

export const AccessibilitySection = ({ title }) => {
  const [data, setData] = useState();
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
        console.error('Error:', error);
      });
  }, []);

  // create a map of each of the successCriteria ->
  // num to make it way easier and faster over time.
  // This will be used to
  // look up the success criteria by rule number
  const createSuccessCriteriaMap = wcagData => {
    const successCriteriaMap = new Map();
    wcagData.principles.forEach(principle => {
      principle.guidelines.forEach(guideline => {
        guideline.successcriteria.forEach(criterion => {
          successCriteriaMap.set(criterion.num, criterion);
        });
      });
    });

    return successCriteriaMap;
  };

  // Compare the component info with the success criteria
  // and return the status of each rule.
  const comparisons = useMemo(() => {
    const compareRules = () => {
      if (!componentInfo || !data) return [];
      const successCriteriaMap = createSuccessCriteriaMap(data);

      const calculatedComparisons = componentInfo.map(rule => {
        const ruleNum = rule.rule;
        const successCriterion = successCriteriaMap.get(ruleNum);

        if (successCriterion) {
          const extractedData = {
            id: successCriterion.id.split(':')[1],
            num: successCriterion.num,
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
        return {
          rule: rule.rule,
          message: `Success criterion with num ${rule.rule} not found`,
        };
      });

      return calculatedComparisons;
    };

    return compareRules();
  }, [componentInfo, data]);

  const statusData = comparisons.map(item => item.status);

  return (
    // not sure about this padding but without there is a huge
    // space from the last section on guidance accessibility
    // and this section.
    <ContentSection pad={{ top: 'small' }}>
      <AccessibilityTable1 statuses={statusData} />
      <AccessibilityTable statuses={statusData} />
      <AccessibilityTestView rules={comparisons} />
    </ContentSection>
  );
};
