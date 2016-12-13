import React, {Component} from 'react';
import ExpandibleMailBox from 'views/components/expandible-mail-box';

export default class ExpandibleMailBoxContainer extends Component {

  renderConversation(data) {
    return data.map((mail) => {
      return (<ExpandibleMailBox key={mail.id} title={mail.from}>
        {mail.message}
      </ExpandibleMailBox>);
    });
  }

  render() {
    const data = [
      {
        id: 7,
        from: 'Robert Planta',
        message: 'Lorem ipsum dolor sit amet, elitr officiis disputationi ut sit, per ea commodo civibus dolores, ut vis consul eleifend referrentur. Eu atqui expetendis has, mea possim inermis ne. Est melius aliquando ad. Pri ut clita patrioque dissentiunt. Maiorum democritum eu qui, equidem dignissim ei mei, an cum philosophia complectitur. Nibh insolens ut eum, sea cu ignota doming efficiantur.<br />Ut quas tacimates partiendo per, sed ea tation voluptua referrentur, sed vivendo perpetua eu. Vel quot eruditi in, eos ex quaeque consequuntur, et eum quas homero laoreet. Qui ut quaeque maiorum. Id labores contentiones vel, nullam salutatus usu no, ad harum similique rationibus mea. Ad scaevola erroribus ius, magna reprehendunt et eos. Eos eu postulant prodesset, duo intellegebat conclusionemque id. <br />At pri magna omnis definiebas, quas luptatum necessitatibus cum in. Mazim nostro fabellas sed no, mea meis aliquam partiendo id. Eu has graece delenit inermis, sed at zril latine. Sea ea assum intellegebat, vix eu aliquip lobortis. Legere graecis id mel, nisl volutpat nam id, ad eros detracto lucilius eam. His an quas vivendo ullamcorper, vel ad quis utroque electram. Sit nibh omnis no, nam ad reque graecis docendi, pertinax volutpat repudiandae ne per. <br />Mea harum impedit ei. Timeam vituperata ad ius. Vis at option deterruisset, ad malis expetenda eam. Vis et mutat nonumy. Petentium hendrerit no est, hinc inani vim ut. Has at aperiam intellegebat, usu expetenda comprehensam ea. <br />Te senserit suavitate eos, ne hinc agam argumentum mea. No dicat oporteat eleifend nec, duo ea inimicus assentior repudiandae. Mea equidem invenire in. An fierent percipit definiebas has, at graeco nusquam moderatius duo. Has omnesque recteque honestatis ei, mel an eros dolor, errem detracto inciderint mei an. An case exerci feugiat his, ius ex eros insolens dissentias.',
        date: '09.12.2001',
      },
      {
        id: 8,
        from: 'Paraschieva fgdsregfdcv',
        message: 'Lorem ipsum dolor sit amet, elitr officiis disputationi ut sit, per ea commodo civibus dolores, ut vis consul eleifend referrentur. Eu atqui expetendis has, mea possim inermis ne. Est melius aliquando ad. Pri ut clita patrioque dissentiunt. Maiorum democritum eu qui, equidem dignissim ei mei, an cum philosophia complectitur. Nibh insolens ut eum, sea cu ignota doming efficiantur.<br />Ut quas tacimates partiendo per, sed ea tation voluptua referrentur, sed vivendo perpetua eu. Vel quot eruditi in, eos ex quaeque consequuntur, et eum quas homero laoreet. Qui ut quaeque maiorum. Id labores contentiones vel, nullam salutatus usu no, ad harum similique rationibus mea. Ad scaevola erroribus ius, magna reprehendunt et eos. Eos eu postulant prodesset, duo intellegebat conclusionemque id. <br />At pri magna omnis definiebas, quas luptatum necessitatibus cum in. Mazim nostro fabellas sed no, mea meis aliquam partiendo id. Eu has graece delenit inermis, sed at zril latine. Sea ea assum intellegebat, vix eu aliquip lobortis. Legere graecis id mel, nisl volutpat nam id, ad eros detracto lucilius eam. His an quas vivendo ullamcorper, vel ad quis utroque electram. Sit nibh omnis no, nam ad reque graecis docendi, pertinax volutpat repudiandae ne per. <br />Mea harum impedit ei. Timeam vituperata ad ius. Vis at option deterruisset, ad malis expetenda eam. Vis et mutat nonumy. Petentium hendrerit no est, hinc inani vim ut. Has at aperiam intellegebat, usu expetenda comprehensam ea. <br />Te senserit suavitate eos, ne hinc agam argumentum mea. No dicat oporteat eleifend nec, duo ea inimicus assentior repudiandae. Mea equidem invenire in. An fierent percipit definiebas has, at graeco nusquam moderatius duo. Has omnesque recteque honestatis ei, mel an eros dolor, errem detracto inciderint mei an. An case exerci feugiat his, ius ex eros insolens dissentias.',
        date: '11.03.2016',
      },
    ];
    return (
      <div>
        {this.renderConversation(data)}
      </div>
    );
  }
}
