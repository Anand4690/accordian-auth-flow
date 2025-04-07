
import { useLocation, Link } from "react-router-dom";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

interface BreadcrumbsProps {
  currentPageTitle?: string;
}

const Breadcrumbs = ({ currentPageTitle }: BreadcrumbsProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumb className="py-3 px-6 bg-gray-50">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/dashboard">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          // Override with the provided title if this is the last item
          const displayName = isLast && currentPageTitle 
            ? currentPageTitle 
            : name.charAt(0).toUpperCase() + name.slice(1);
          
          return (
            <BreadcrumbItem key={routeTo}>
              <BreadcrumbSeparator />
              {isLast ? (
                <BreadcrumbPage>{displayName}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={routeTo}>{displayName}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
