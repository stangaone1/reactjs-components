import React from 'react';

const QuestionTitle = ({children})=> {
  return (
    <div className="Question-title">{children}</div>
  );
};

QuestionTitle.displayName = 'QuestionTitle';
export default QuestionTitle;
