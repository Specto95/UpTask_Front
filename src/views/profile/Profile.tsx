import ProfileForm from "../../components/profile/ProfileForm";
import { useAuth } from "../../hooks/useAuth";

export function Profile() {
  const { data, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  if (data) return <ProfileForm data={data} />;
}
