import axios from 'axios';
import IDataList from '../model/IDataList';

const getDataFromServer = () => {
    return axios.get<IDataList[]>(`http://localhost:3002/expenseDb`)
        .then(response => response.data)
};

const pushDataToUser = (newpurchase: Omit<IDataList, 'id'>) => {
    return axios.post<IDataList>(
        `http://localhost:3002/expenseDb`,
        newpurchase,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => response.data)
};

export {
    getDataFromServer,
    pushDataToUser
}