/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from 'react';
import { Notification } from 'grommet';
import { WCAGRuleDetail, WCAGRuleSummary } from '.';

// title prop is the name of the component that will be passed in mdx file
// version will be used so if we need to update the version of WCAG we can do it
// easily component by component.
export const AccessibilitySection = ({ title, version }) => {
  const [data, setData] = useState();

  const componentData = require(`../../data/wcag/${title.toLowerCase()}.json`);
  const componentInfo = useMemo(() => {
    if (!title || !componentData) {
      return [];
    }

    return componentData ? componentData : [];
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
    const result = componentInfo
      .filter(rule => rule.status !== 'not-applicable')
      .map(rule => {
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

          // If the rule status is failed && level = AAA,
          // change status to AAA not achieved
          if (rule.status === 'failed' && extractedData.level === 'AAA') {
            extractedData.status = 'AAA not achieved';
          } else {
            extractedData.status = rule.status;
          }

          return {
            ...extractedData,
            status: extractedData.status,
          };
        }

        return {
          rule: ruleNum,
          message: `Success criterion with num ${ruleNum} not found`,
        };
      });
    return result;
  }, [componentInfo, successCriteriaMap]);

  const statusData = comparisons.map(item => item.status);

  return (
    <>
      <Notification
        status="info"
        margin={{ bottom: 'medium' }}
        width="large"
        message={`"Conditional" status indicates extra
        actions required by implementers for full compliance.`}
      />
      <WCAGRuleSummary statuses={statusData} />
      <WCAGRuleDetail version={version || '2.2'} rules={comparisons} />
    </>
  );
};
