import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { AuthProvider } from "@/providers/AuthProvider";
import { getUserWithProfile } from "@/lib/auth/getUserWithProfile";
import { getCart } from "@/lib/cart/getCart";
import getFavorites from "@/lib/favorites/getFavorites";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, profile } = await getUserWithProfile();

  const { cart } = await getCart();
  const cart_count =
    cart?.cart_items
      .map((item) => item.quantity)
      .reduce((a: any, b: any) => a + b, 0) || 0;

  const { data: favorites } = await getFavorites();
  const fav_count = favorites?.length || 0;

  return (
    <div className="min-h-screen mx-auto app-container flex flex-col">
      <AuthProvider initialUser={user} initialProfile={profile}>
        <Header cart_count={cart_count} fav_count={fav_count} />
        <div className="mt-(--header-height)">{children}</div>
        <Footer />
      </AuthProvider>
    </div>
  );
}
