import Styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, getFilterWord } from "../redux/selectors";
import { deleteContact } from "../redux/contactsSlice";
import { change } from "../redux/filterSlice";

const ContactList = () => {
  const dispatch = useDispatch();
  const allContact = useSelector(getContacts);
  const filterText = useSelector(getFilterWord);

  const deleteFunc = (ev) => {
    const idContact = ev.target.value;
    dispatch(deleteContact(idContact));
  };

  const filtredContacts = (ev) => {
    const inputText = ev.target.value;
    dispatch(change(inputText));
  };

  return (
    <div className={Styles.rightPage}>
      <h2>Contacts</h2>
      <label htmlFor="idFilter">Find contacts by name</label>
      <br />
      <input
        id="idFilter"
        type="text"
        name="filter"
        onChange={filtredContacts}
        autoComplete="true"
      />
      <ul className={Styles.list}>
        {allContact &&
          allContact.map(
            (obj) =>
              obj.name.toLowerCase().includes(filterText.toLowerCase()) && (
                <li key={obj.id} className={Styles.itemList}>
                  <span>
                    {obj.name}: {obj.number}
                  </span>
                  <button type="button" onClick={deleteFunc} value={obj.id}>
                    Delete
                  </button>
                </li>
              ),
          )}
      </ul>
    </div>
  );
};

export default ContactList;
