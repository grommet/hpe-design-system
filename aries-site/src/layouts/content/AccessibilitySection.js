/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from 'react';
import { WCAGRuleDetail, WCAGRuleSummary } from '.';
import componentData from '../../data/wcag/components.json';

// title prop is the name of the component that will be passed in mdx file
// version will be used so if we need to update the version of WCAG we can do it
// easily component by component.
export const AccessibilitySection = ({ title, version }) => {
  const [data, setData] = useState();

  const componentInfo = useMemo(() => {
    if (!title || !componentData) {
      return [];
    }

    const component = componentData.find(item => item[title.toLowerCase()]);
    return component ? component[title.toLowerCase()] : [];
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
  const successCriteriaMap = useMemo(() => {
    if (!data) return new Map();

    const map = new Map();
    data.principles?.forEach(principle => {
      principle.guidelines?.forEach(guideline => {
        guideline.successcriteria?.forEach(criterion => {
          map.set(criterion.num, criterion);
        });
      });
    });
    return map;
  }, [data]);

  // Compare the component info with the success criteria
  // and return the status of each rule.
  const comparisons = useMemo(() => {
    return componentInfo.map(rule => {
      const ruleNum = rule.rule;
      const successCriterion = successCriteriaMap.get(ruleNum);

      if (successCriterion) {
        const extractedData = {
          id: successCriterion.id.split(':')[1],
          num: successCriterion.num,
          level: successCriterion.level,
          handle: successCriterion.handle,
          title: successCriterion.title,
        };

        return {
          ...extractedData,
          status: rule.status,
        };
      }

      return {
        rule: ruleNum,
        message: `Success criterion with num ${ruleNum} not found`,
      };
    });
  }, [componentInfo, successCriteriaMap]);

  const statusData = comparisons.map(item => item.status);

  return (
    <>
      <WCAGRuleSummary statuses={statusData} />
      <WCAGRuleDetail version={version || '2.2'} rules={comparisons} />
    </>
  );
};