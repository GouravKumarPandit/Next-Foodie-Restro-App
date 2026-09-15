import AdminSidebar from "../../components/admin/layout/AdminSidebar";
import AdminHeader from "../../components/admin/layout/AdminHeader";

export default function AdminLayout({ children }) {
	return (
		<div className="min-h-screen bg-[#fff8ef]">
			<AdminSidebar />
			<div className="lg:pl-64">
				<AdminHeader />
				<main className="p-4 sm:p-6 lg:p-8">
					{children}
				</main>
			</div>
		</div>
	);
}