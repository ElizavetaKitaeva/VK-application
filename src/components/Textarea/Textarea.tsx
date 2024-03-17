import { FocusEvent, FC } from 'react';
import './Textarea.css';

interface TextareaProps {
  fact: string;
  setFact: (e: string) => void;
}

const Textarea: FC<TextareaProps> = ({fact, setFact}) => {
  
  const focusTextarea = (event: FocusEvent<HTMLTextAreaElement>) => {
    const cursorPosition = event.currentTarget.value.split(' ')[0].length;
    const textFocus = event.currentTarget.value.length;
    event.currentTarget
      .setSelectionRange(textFocus, cursorPosition);
  } 

  return (
      <textarea 
        className='text-catFact'
        rows={4}
        cols={80}
        ref={ref => ref && ref.focus()}
        onFocus={focusTextarea}
        spellCheck="false"
        maxLength={800}
        value={fact} 
        onChange={e => setFact(e.target.value)}
        placeholder='Нажми на кнопку "kitty fact", чтобы узнать факт о котиках'
      />
  );
}
 
export default Textarea;