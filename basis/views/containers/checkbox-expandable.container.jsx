import React, {Component} from 'react';
import CheckboxExpandable from 'views/components/checkbox-expandable';

export default class CheckboxExpandableContainer extends Component {
  constructor() {
    super();
    this.state = {
      expandable: [
        {
          title: 'Availability',
          subTitle: 'Show the website users since when you will offer the Create Your Taste facility',
          label: 'Display the availability in the page',
          checked: true,
        },
        {
          title: 'Availability',
          subTitle: 'Show the website users since when you will offer the Create Your Taste facility',
          label: 'Display the availability in the page',
          checked: true,
        },
        {
          title: 'Availability',
          subTitle: 'Show the website users since when you will offer the Create Your Taste facility',
          label: 'Display the availability in the page',
          checked: false,
        },
      ],
    };
  }

  onChange(elementPosition, checked) {
    const expandable = [...this.state.expandable];
    expandable[elementPosition].checked = checked;
    this.setState({
      expandable: expandable,
    });
  }

  render() {
    const style = {
      width: '100%',
      border: '1px solid crimson',
      backgroundColor: 'white',
      borderRadius: '8px',
    };

    return (
      <div>
        <div style={style}>
          {this.state.expandable.map((expandableElement, index) => {
            return (
              <CheckboxExpandable
                key={index}
                {...expandableElement}
                onCheckBoxChange={this.onChange.bind(this, index)}
              >
                <div>
                  Lorem ipsum dolor sit amet, audiam mediocritatem est ex. Ex epicuri patrioque pertinacia pri, sit
                  causae gloriatur no, mel id integre impedit voluptua. Quo debitis accommodare ut. Quo ut quis graece.
                  Novum laudem accommodare cum ex, an convenire intellegebat qui.

                  Id eos posse harum persequeris, equidem philosophia nec ea. Eu ignota nostrud admodum mei, ei pro
                  liber nostro, ut affert aliquam nam. Ea mel adhuc ullum, nam delenit voluptua ne, duo accusam
                  tincidunt eu. Te ius nihil graeco habemus, option percipitur ad vel. Periculis reformidans per an, ei
                  nec dolore ubique percipitur.

                  Summo qualisque in eos, odio interpretaris cum et. Vocibus platonem consectetuer in pro, ei quem
                  dictas corpora sit, no omnis praesent est. Mea te nostro quaerendum. Ea pri summo fabulas principes.
                  An sed incorrupte conclusionemque, tale nominati et mei. Usu ei vocibus epicurei, an sed oratio
                  aperiri definiebas.

                  Sea erant civibus instructior te, debitis evertitur elaboraret ea pro, vide graece no duo. At harum
                  diceret mei. Ne prima gloriatur usu. Ut convenire expetenda elaboraret pri. Vim nihil delenit ex, case
                  duis tibique quo no, sit an decore integre voluptatum.

                  Has in ignota timeam euripidis, porro convenire eos an. Tale eligendi et est. Tibique mentitum te his,
                  sed equidem maiorum ex, nonumy option laboramus has ne. Per ne quas instructior, erroribus assueverit
                  qui an.
                </div>
              </CheckboxExpandable>);
          })
          }
        </div>
      </div>
    );
  }
}
