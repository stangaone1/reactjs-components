import React, {Component} from 'react';
import ReadMore from 'views/components/read-more';
import Notification from 'views/components/notification';

export default class ReadMoreContainer extends Component {
  render() {
    return (
      <div>
        <h3>Simple usage</h3>
        <ReadMore trimmed="Lorem ipsum dolor sit amet..." >
          <h3> Full Content </h3>
          <p>
            Lorem ipsum dolor sit amet, no sit adipisci partiendo, ea option alterum nec. Pro ei impedit deserunt. Amet audire accommodare mel ad, ne sea vocibus delicata postulant. Sea putant vivendo ea, vim ad facer sadipscing, mea ei erat verterem forensibus. Cu viris oblique molestiae qui.

            Sit maiorum deseruisse ei. Id veritus appellantur mei. Semper atomorum perpetua mei in, ea eum nibh democritum inciderint, id vix affert regione. Ut nihil eleifend ius. Oporteat liberavisse in duo, porro evertitur in per.

            No audiam intellegat mnesarchum nam, et albucius apeirian instructior eam. Labitur appetere voluptaria an sed, legimus meliore nominavi duo cu. Ea vidit elaboraret sit, cum stet argumentum appellantur in. No feugiat gubergren duo, amet cetero ex sit.

          </p>
        </ReadMore>

        <h3>Using it with notification</h3>
        <Notification>
          <ReadMore trimmed="Lorem ipsum dolor sit amet..." >
              Lorem ipsum dolor sit amet, no sit adipisci partiendo, ea option alterum nec.
          </ReadMore>
        </Notification>

        <h3>With custom event on clicking</h3>
        <ReadMore trimmed="Lorem ipsum dolor sit amet..." onClick={alert.bind(void 0, 'Do whatever you want!')} />
        <small>
          Can be used to display modals when clicking read more
        </small>
      </div>
    );
  }
}
