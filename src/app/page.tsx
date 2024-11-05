import { getCities } from './actions/getFilteredCities';
import { Form } from './components/Form/Form';


export default async function Home(){
  const cities = await getCities();
  return (
    <Form cities={cities}/>
  );
}
