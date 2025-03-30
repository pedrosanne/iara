import { App as TradingApp } from '../App';
import { Header } from '../components/header/Header';
import { Footer } from '../components/Footer';

export const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--background))]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pt-20 pb-8">
        <TradingApp />
      </main>

      <Footer />
    </div>
  );
};