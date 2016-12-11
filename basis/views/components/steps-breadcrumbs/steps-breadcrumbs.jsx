import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import {Link} from 'react-router';
import shallowCompare from 'react-addons-shallow-compare';
import './steps-breadcrumbs.scss';
import {findIndex} from 'lodash';
import {pushState} from 'redux-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, {pushState}), dispatch),
  };
}

@connect(null, mapDispatchToProps)
export default class StepsBreadcrumbs extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    steps: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })).isRequired,
    currentStep: PropTypes.number,
    pathname: PropTypes.string,
    handleSubmit: PropTypes.func,
    actions: PropTypes.object,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onBreadClick(index, disabled, to, e) {
    const {steps, actions} = this.props;

    if (!disabled && steps[index].onClick) {
      steps[index].onClick(e);
    }

    if (!disabled && to) {
      actions.pushState(null, to);
    }
  }

  renderStep(step, index, currentStep) {
    const {name, className, disabled, ...props} = step;
    const disabledBread = typeof disabled === 'undefined' ? index + 1 >= currentStep : disabled;

    const stepClass = cx(
      'StepsBreadcrumbs-step', {
        'StepsBreadcrumbs-step--current': index + 1 === currentStep,
        'StepsBreadcrumbs-step--disabled': disabledBread,
      },
      className
    );

    const Element = props.to ? Link : 'div';

    const {handleSubmit} = this.props;

    return (
      <li key={index} className={stepClass}>
        <Element
          {...props}
          onClick={handleSubmit ? handleSubmit(this.onBreadClick.bind(this, index, disabledBread, props.to)) : this.onBreadClick.bind(this, index, disabledBread, props.to)}
          disabled={disabledBread}
          className="StepsBreadcrumbs-stepElement"
        >
          <span className="StepsBreadcrumbs-stepNumber">{index + 1}</span>
          <span className="StepsBreadcrumbs-stepLabel">{name}</span>
        </Element>
      </li>
    );
  }

  render() {
    const {
      className,
      children,
      steps,
      pathname,
      currentStep,
      ...props,
    } = this.props;
    const componentClasses = cx('StepsBreadcrumbs', className);
    let current = currentStep;
    let compiledSteps = steps;

    if (!currentStep && pathname) {
      const urlFragments = pathname.split('/');
      urlFragments.pop();

      compiledSteps = steps.map((step) => {
        if (!step.to) {
          return step;
        }
        return {
          ...step,
          to: urlFragments.join('/') + '/' + step.to,
        };
      });

      const index = findIndex(compiledSteps, (step) => step.to === pathname);
      if (index > -1) {
        current = index + 1;
      }
    }

    return (
      <ul {...props} className={componentClasses}>
        {compiledSteps.map((step, index) => this.renderStep(step, index, current))}
      </ul>
    );
  }
}

