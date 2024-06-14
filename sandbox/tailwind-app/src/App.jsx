import './App.css';
import { Button } from './components/Button';

function App() {
  return (
    // TO DO right now the namespace of "background" and "text" is repeated
    // is that okay?
    <div className="flex flex-col items-start bg-background-back px-large pt-medium pb-large  min-h-screen	w-full gap-medium">
      <div className="flex w-full justify-between items-start py-medium">
        <h1 className="text-text-strong">Test page</h1>
        <div className="flex flex-row gap-small">
          <Button label="Default button" />
          <Button label="Secondary button" kind="secondary" />
          <Button
            label="Toggle theme mode"
            kind="primary"
            onClick={() => {
              if (
                !document.documentElement.getAttribute('data-mode') ||
                document.documentElement.getAttribute('data-mode') === ''
              ) {
                document.documentElement.setAttribute('data-mode', 'dark');
              } else {
                document.documentElement.setAttribute('data-mode', '');
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-col bg-background-front p-medium rounded-small w-full gap-small">
        <h2 className="text-text-strong">Subsection A</h2>
        <p className="text-text-default">
          Banjo pour-over kinfolk mukbang taiyaki semiotics. Craft beer neutral
          milk hotel tonx chicharrones small batch taxidermy hexagon church-key
          hot chicken salvia solarpunk cred godard. Franzen shoreditch
          kickstarter crucifix. Polaroid pop-up sus, street art narwhal franzen
          bruh air plant authentic lyft.
        </p>
        {[
          'xsmall',
          'small',
          'medium',
          'large',
          'xxlarge',
          '3xl',
          '4xl',
          '5xl',
        ].map(size => (
          <span key={size} className={`text-${size} text-text-default`}>
            {size} text
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
