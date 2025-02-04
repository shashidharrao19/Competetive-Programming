// components/Sidebar.js
import { Button } from "@/components/ui/button"
import { ScrollText, Clipboard, Heart, ActivitySquare, Settings } from "lucide-react"
import { Link } from "react-router-dom"

export default function Sidebar({userRole}) {
  const isAccessable = userRole == 'administrator' ? false : true;
  return (
    <div className="w-52 bg-secondary p-4 space-y-4">
      <h2 className="text-lg font-semibold mb-6">Navigation</h2>
      <nav className="space-y-2">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/eddashboard">
            <ScrollText className="mr-2 h-4 w-4" />
            ED Dashboard
          </Link>
        </Button>
      </nav>

      <div className="h-16"></div>
      <h3 className="text-md font-semibold mb-2">Quick Access</h3>
      <nav className="space-y-2">
      <Button
      asChild
      variant="ghost"
      className="w-full justify-start"
      disabled={!isAccessable} // Disable based on condition
    >
      <Link
        to={isAccessable ? "/PatientAdmissionTriage" : "#"}
        className={isAccessable ? "" : "cursor-not-allowed"} // Prevent clicking if disabled
      >
        <Clipboard className="mr-2 h-4 w-4" />
        Triage
      </Link>
    </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/cprform">
            <Heart className="mr-2 h-4 w-4" />
            CPR
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/vitals">
            <ActivitySquare className="mr-2 h-4 w-4" />
            Vitals
          </Link>
        </Button>
      </nav>

      <div className="h-16"></div>
      <h3 className="text-md font-semibold mb-2">Administration</h3>
      <nav className="space-y-2">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/medicationmaster">
            <Settings className="mr-2 h-4 w-4" />
            Medication Master
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/labmaster">
            <Settings className="mr-2 h-4 w-4" />
            Lab Master
          </Link>
        </Button>
      </nav>
    </div>
  )
}