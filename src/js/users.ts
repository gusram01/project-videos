import { Movie, User } from '../interfaces/User-Movies';

const dummyUser: User = { _id: 'none', data: { user: 'no', password: 'ne' } }

const storeUser = (user: User) => {
  const usersStorage = localStorage.getItem('stor4g3AppV1d3o.l0cal');
  const usersJSON: User[] = JSON.parse(usersStorage) || [dummyUser];
  const userLocal: User = usersJSON.find(element => element._id === user._id);

  (!usersStorage)
    //  Important! must be JSON.stringify(Array<User>) in the very first beggining
    ? (localStorage.setItem('stor4g3AppV1d3o.l0cal', JSON.stringify([user]))
      , sessionStorage.setItem('Us3rActu4l', JSON.stringify(user)))
    : (!userLocal)
      ? (usersJSON.push(user)
        , localStorage.setItem('stor4g3AppV1d3o.l0cal', JSON.stringify(usersJSON))
        , sessionStorage.setItem('Us3rActu4l', JSON.stringify(user)))
      : sessionStorage.setItem('Us3rActu4l', JSON.stringify(userLocal));
}


/**
 * ================================================
 *  Export functions - Control & movies Connection
 * ================================================
 */

export const actualUser = () => {

  const idUser = JSON.parse(sessionStorage.getItem('Us3rActu4l'))._id;
  const usersArray = localStorage.getItem('stor4g3AppV1d3o.l0cal');
  const usersJSON: User[] = JSON.parse(usersArray);
  const userLocalStorage: User | undefined = usersJSON.find(element => element._id === idUser);
  const indexUserLocalStorage: number = usersJSON.findIndex(element => element._id === idUser);

  if (!userLocalStorage) return false;
  return { indexUser: indexUserLocalStorage, user: userLocalStorage, array: usersJSON };
}


export const validateUser = (user: string, password: string, favorites: Array<Movie> = []) => {
  const newUser = {
    _id: user + password,
    data: {
      user,
      password,
      favorites
    }
  }
  storeUser(newUser);
}
