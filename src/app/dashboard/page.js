import DashboardForm from '@/components/DashboardForm';
import LogoutButton from '@/components/LogoutButton';

const DashboardPage = () => {
  return (
    <div className="bg-[#0f172a] text-white py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
        Dashboard
      </h1>
      <div className="max-w-4xl mx-auto">
        <LogoutButton />
        <DashboardForm />
      </div>
    </div>
  );
};

export default DashboardPage;
