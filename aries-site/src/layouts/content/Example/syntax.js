import styled from 'styled-components';

export const syntax = {
  dark: styled.pre`
    background: transparent;
    .string {
      color: #6c9;
    }
    .keyword {
      color: #c9c;
    }
    .function {
      color: #f93;
    }
    .operator {
      color: #6cc;
    }
    .tag {
      color: #f66;
    }
    .script {
      color: #ccc;
    }
    .punctuation {
      color: #ccc;
    }
    .attr-name {
      color: #6c9;
    }
    .attr-value {
      color: #c9c;
    }
  `,
  light: styled.pre`
    background: transparent;
    .string {
      color: #690;
    }
    .keyword {
      color: #069;
    }
    .function {
      color: #c66;
    }
    .operator {
      color: #963;
    }
    .tag {
      color: #906;
    }
    .script {
      color: #333;
    }
    .punctuation {
      color: #999;
    }
    .attr-name {
      color: #690;
    }
    .attr-value {
      color: #069;
    }
  `,
};
