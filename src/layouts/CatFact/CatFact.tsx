import { useState } from 'react';
import Button from "../../components/Button/Button";
import Textarea from '../../components/Textarea/Textarea';
import './CatFact.css'

const CatFact = () => {
  const [fact, setFact] = useState<string>('');
  
  const onSubmit = async() => {
    const response = await fetch(`https://catfact.ninja/fact`);
    const data = await response.json();
    setFact(data.fact);
  };

  return (
    <div className='cat-facts__block'>
      <Button 
        className="cat-fact__button"
        name="kitty fact" 
        handleClick={onSubmit}
      />
      <Textarea
        fact={fact}
        setFact={setFact}
      />
    </div>
  );
}
 
export default CatFact;