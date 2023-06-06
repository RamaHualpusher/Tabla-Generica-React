import axios from 'axios';

interface Data {
  about: About;
  services: Service[];
  contact: Contact;
}

interface About {
  title: string;
  description: string;
  image: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Contact {
  email: string;
  phone: string;
  address: string;
  map: string;
}

const DataService = {
  getData: async (): Promise<Data | null> => {
    try {
      const response = await axios.get<Data>('/data/data.json'); // Asegúrate de que la ruta sea correcta
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  },
};

export default DataService;
