import React, {Component} from 'react';
import ScrollArea from 'views/components/scroll-area';

export default class ScrollAreaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in semper ante. Donec eleifend dictum purus vitae luctus. Sed gravida sapien sed erat blandit elementum. Nunc elementum vitae erat sed maximus. Nam faucibus, massa vel semper tincidunt, ligula nisi porta elit, id efficitur ipsum nisi id sapien. Cras eu ultricies ipsum, id posuere massa. Curabitur congue pharetra commodo. Etiam non nunc maximus, sagittis diam quis, hendrerit nisi. Suspendisse nulla mauris, pellentesque sit amet tempor eget, dignissim vitae metus. Suspendisse auctor mattis dui, sed blandit lectus aliquam semper. Etiam blandit in odio vitae ullamcorper. Aliquam convallis, lacus non aliquam elementum, ante quam tincidunt ex, non venenatis sapien nisi sed orci. Nam pretium ante eu dignissim congue. Nunc faucibus aliquet ligula non sodales. Quisque ultrices porta ipsum eu ornare.
      Suspendisse accumsan sodales fermentum. Aliquam vehicula, lorem quis lacinia luctus, libero erat molestie neque, ut ultricies metus tortor condimentum augue. Aliquam venenatis consectetur risus. Etiam nec lacinia elit. Etiam nec massa sem. Nullam lobortis, sapien eu vestibulum rutrum, orci lorem sollicitudin risus, nec feugiat risus ligula in quam. Nunc erat neque, convallis eget auctor nec, ultricies a ligula.
      Nunc hendrerit nunc a tellus faucibus blandit. Nam consequat finibus nisi, id maximus arcu vestibulum vitae. Vestibulum nec interdum elit. Morbi porta aliquet nisl, non vehicula erat sodales vulputate. Morbi non consequat eros, eu sagittis leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam malesuada odio et dui imperdiet euismod. Duis ut ante urna. Praesent quis dui efficitur, vehicula nibh ut, eleifend magna. Donec auctor dapibus ultrices. Nunc ullamcorper scelerisque fringilla. Ut id nibh in orci pretium molestie. Aenean volutpat nec orci ut commodo. Duis eget semper libero. In tempor turpis justo, quis molestie tellus commodo in.`,
    };
  }

  duplicateContent() {
    this.setState({
      content: this.state.content + this.state.content,
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.duplicateContent.bind(this)}>Duplicate content</button>
        <h2>Samll container</h2>
        <ScrollArea style={{width: '200px', height: '200px'}}>
          {this.state.content}
        </ScrollArea>
        <h2>Bigger container</h2>
        <ScrollArea style={{maxWidth: '400px', height: '300px'}}>
          {this.state.content}
        </ScrollArea>
        <h2>No scroll</h2>
        <ScrollArea>
          {this.state.content}
        </ScrollArea>
      </div>
    );
  }
}
