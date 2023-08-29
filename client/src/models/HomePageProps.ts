export interface HomePageProps {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  initializeChat: () => void;
}
