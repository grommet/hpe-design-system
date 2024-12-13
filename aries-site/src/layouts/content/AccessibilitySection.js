/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AccessibilityTable,
  AccessibilityTable1,
  AccessibilityTestView,
  ContentSection,
  Subsection,
} from '.';
import componentData from '../../data/wcag/components.json';

export const AccessibilitySection = ({ title }) => {
  const [data, setData] = useState(null);
  // need to decide how to handle the error
  const [errorMessage, setErrorMessage] = useState(null);
  const [componentInfo, setComponentInfo] = useState(null);

  console.log(errorMessage);

  useEffect(() => {
    if (title && componentData) {
      // what if there isn't a component?
      const component = componentData.find(item => item[title.toLowerCase()]);
      setComponentInfo(component[title.toLowerCase()]);
    }
  }, [title]);

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/w3c/wcag/refs/heads/main/guidelines/wcag.json',
      )
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  }, []);

  const compareRules = () => {
    if (!componentInfo || !data) return [];

    const comparisons = componentInfo.map(rule => {
      const [principleNum, guidelineNum] = rule.rule
        .split('.')
        .map(num => parseInt(num, 10));

      const principleIndex = principleNum - 1;
      const principle = data.principles[principleIndex];
      // need to handle the case where the principle doesn't exist

      const guideline = principle.guidelines[guidelineNum - 1];
      // need to handle the case where the guideline doesn't exist

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
            : null,
          level: successCriterion.level,
          handle: successCriterion.handle,
          title: successCriterion.title,
        };
        const { status } = rule;
        console.log('Extracted Data:', extractedData);
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

    return comparisons;
  };

  const comparisons = compareRules();
  const statusData = comparisons.map(item => item.status);

  return (
    <ContentSection>
      <Subsection name="Accessibility Status">
        <AccessibilityTable1 statuses={statusData} />
        <AccessibilityTable statuses={statusData} />
        <AccessibilityTestView rules={comparisons} />
      </Subsection>
    </ContentSection>
  );
};
