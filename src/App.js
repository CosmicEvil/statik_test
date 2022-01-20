
import './App.css';
import Form from './component/form/form';
import giraffe from './images/giraffe.png';
function App() {
  return (
    <div className="App">
      
      <Form />
      <img className='giraffe' src={giraffe} alt="giraffe" />
    </div>
  );
}

export default App;
