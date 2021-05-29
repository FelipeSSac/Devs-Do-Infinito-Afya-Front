import React from 'react';

import { ClientContent } from './styles';

import MainNavBar from '../../../components/MainNavBar';
import FormAddClient from '../../../components/FormAddClient';


const Client: React.FC = () => {
  return (
    <ClientContent>
      <div id="main">
        <div className="container">
          <MainNavBar />
          <div className="content">
            <FormAddClient />
          </div>
        </div>
      </div>
    </ClientContent>
  );
}

export default Client;