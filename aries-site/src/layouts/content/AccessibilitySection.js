/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from 'react';
import { WCAGRuleDetail, WCAGRuleSummary } from '.';
import componentData from '../../data/wcag/components.json';

export const AccessibilitySection = ({ title }) => {
  const [data, setData] = useState();
  const [componentInfo, setComponentInfo] = useState();

  useEffect(() => {
    if (!title || !componentData) {
      return;
    }

    const component = componentData.find(item => item[title.toLowerCase()]);

    if (!component || !component[title.toLowerCase()]) {
      return;
    }

    setComponentInfo(component[title.toLowerCase()]);
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
    wcagData?.principles?.forEach(principle => {
      principle.guidelines?.forEach(guideline => {
        guideline.successcriteria?.forEach(criterion => {
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
            // There are multiple versions of the success criteria
            // we want to get the highest version number
            version: successCriterion.versions
              ? successCriterion.versions.reduce((max, version) => {
                  const parsedVersion = parseFloat(version);
                  return Math.max(max, parsedVersion);
                }, 0)
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
          rule: ruleNum,
          message: `Success criterion with num ${ruleNum} not found`,
        };
      });

      return calculatedComparisons;
    };

    return compareRules();
  }, [componentInfo, data]);

  const statusData = comparisons.map(item => item.status);

  return (
    <>
      <WCAGRuleSummary statuses={statusData} />
      <WCAGRuleDetail rules={comparisons} />
    </>
  );
};
