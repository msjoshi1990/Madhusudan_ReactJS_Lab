import { useEffect, useState } from "react";
import IDataList from "../model/IDataList";
import { getDataFromServer } from "../services/menu";
import ExpenseTracker from "./ExpenseTracker";

function ShowData() {
  const [items, setItems] = useState<IDataList[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [sum, setSum] = useState<number | null>();
  const [manjuspent, setManjuspent] = useState<number>(0);
  const [sureshspent, setSureshspent] = useState<number>(0);
  const [showform, setShowForm] = useState<boolean>(false);

  var manjuspent1: number = 0;
  var sureshspent1: number = 0;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getDataFromServer();
        setItems(data);
        setSum(
          data.reduce(
            (result, currentObject) => (result = result + currentObject.price),
            0
          )
        );
        Shares(data);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchMenu();
  }, [showform]);

  const Shares = (data: IDataList[]) => {
    data.map((sams) =>
      sams.payeeName === "Manju"
        ? (manjuspent1 = manjuspent1 + sams.price)
        : (sureshspent1 = sureshspent1 + sams.price)
    );
    setManjuspent(manjuspent1);
    setSureshspent(sureshspent1);
  };

  const success = () => {
    setShowForm(false);
  };
  const cancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showform && (
        <div className="form">
          <ExpenseTracker onTrue={success} onClose={cancel} />
        </div>
      )}
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>
          Payee
        </div>
      </>
      {items &&
        items.map((user, idx) => (
          <div key={idx}>
            <div className="use-inline date">{user.setDate}</div>
            <div className="use-inline">{user.product}</div>
            <div className="use-inline price">{user.price}</div>
            <div className={`use-inline ${user.payeeName}`}>
              {user.payeeName}
            </div>
          </div>
        ))}
      <hr />
      <div className="use-inline ">Total expenses: </div>
      <span className="use-inline total">{sum}</span> <br />
      <div className="use-inline ">Manju paid: </div>
      <span className="use-inline total Manju">{manjuspent}</span> <br />
      <div className="use-inline ">Suresh paid: </div>
      <span className="use-inline total Suresh">{sureshspent}</span> <br />
      <span className="use-inline payable">
        {manjuspent > sureshspent ? "Pay to Manju " : "Pay to Suresh"}
      </span>
      <span className="use-inline payable price">
        {" "}
        {Math.abs((manjuspent - sureshspent) / 2)}
      </span>
      {error && <>{error?.message}</>}
    </>
  );
}
export default ShowData;
