import { HomePageProps } from "../models/HomePageProps";

export default function HomePage({
  setUserName,
  username,
  initializeChat,
}: HomePageProps) {
  return (
    <div className="homePage">
      <div className="homeContainer">
        <h1 className="headerHome">Chatt App</h1>

        <div className="inputContainer">
          <input
            className="inputHomePage"
            placeholder="Skriv ditt användarnamn"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
          />
          <button onClick={initializeChat} className="inputBtn">
            Börja chatta
          </button>
        </div>
      </div>
    </div>
  );
}
