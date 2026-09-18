import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";

export default function AdminLayout({ children }) {
	return (
		<>
			<Header />
				{children}
			<Footer />
		</>
	);
}