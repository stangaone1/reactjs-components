import React from 'react';

const QuestionContent = ({children})=> {
  return (
    <div className="Question-content">{children}</div>
  );
};

QuestionContent.displayName = 'QuestionContent';
export default QuestionContent;
