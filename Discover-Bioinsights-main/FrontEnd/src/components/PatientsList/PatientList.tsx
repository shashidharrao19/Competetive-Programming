"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X, Search } from "lucide-react";
import { fetchPatients } from "../../api/PatientService";



export default function Component() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (error) {
        console.error("Failed to load patients:", error);
      }
    };

    loadPatients();
  }, []);

  const [showDischargedPatients, setShowDischargedPatients] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    age: "",
    triagelevel: "",
    time: "",
    status: "",
    staff: "",
    careathway: "",
    progress: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.age === "" || patient.age.toString().includes(filters.age)) &&
        (filters.triagelevel === "" ||
          patient.triagelevel === filters.triagelevel) &&
        patient.time.toLowerCase().includes(filters.time.toLowerCase()) &&
        (filters.status === "" || patient.status === filters.status) &&
        patient.staff.toLowerCase().includes(filters.staff.toLowerCase()) &&
        (filters.careathway === "" ||
          patient.careathway === filters.careathway) &&
        patient.progress
          .toLowerCase()
          .includes(filters.progress.toLowerCase()) &&
        (showDischargedPatients ? true : patient.status !== "Discharged")
      );
    });
  }, [patients, filters, showDischargedPatients]);

  const uniqueValues = useMemo(() => {
    const values = {
      triagelevel: new Set(),
      status: new Set(),
      careathway: new Set(),
    };
    patients.forEach((patient) => {
      values.triagelevel.add(patient.triagelevel);
      values.status.add(patient.status);
      values.careathway.add(patient.careathway);
    });
    return values;
  }, [patients]);

  const FilterDropdown = ({ column, options }) => {
    const [open, setOpen] = useState(false);
    const [tempValue, setTempValue] = useState("");

    const handleApplyFilter = () => {
      handleFilterChange(column.toLowerCase(), tempValue);
      setOpen(false);
    };

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Filter {column}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <div className="p-2">
            {column === "Time" ||
            column === "Staff" ||
            column === "Progress" ? (
              <div className="flex items-center space-x-2">
                <Input
                  placeholder={`Filter ${column}...`}
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="flex-grow"
                />
                <Button size="sm" onClick={() => handleApplyFilter(column)}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
          {options &&
            options.map((option) => (
              <DropdownMenuItem
                key={option}
                onSelect={() => {
                  handleFilterChange(column.toLowerCase(), option);
                  setOpen(false);
                }}
              >
                {option}
              </DropdownMenuItem>
            ))}
          {filters[column.toLowerCase()] && (
            <DropdownMenuItem
              onSelect={() => {
                handleFilterChange(column.toLowerCase(), "");
                setOpen(false);
              }}
            >
              <X className="mr-2 h-4 w-4" /> Clear filter
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            Patient List -{" "}
            {showDischargedPatients
              ? "All Patients"
              : "Currently Present in the ED"}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span>Present in ED</span>
            <Switch
              checked={showDischargedPatients}
              onCheckedChange={setShowDischargedPatients}
            />
            <span>All Patients</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Filter by name"
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(
            ([key, value]) =>
              value && (
                <Badge key={key} variant="secondary" className="text-xs">
                  {key}: {value}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-xs"
                    onClick={() => handleFilterChange(key, "")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {key} filter</span>
                  </Button>
                </Badge>
              )
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">
                Name of Patient
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Age
                <FilterDropdown column="Age" />
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Triage Level
                <FilterDropdown
                  column="TriageLevel"
                  options={Array.from(uniqueValues.triagelevel)}
                />
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Admit Time
                <FilterDropdown column="Time" />
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Status
                <FilterDropdown
                  column="Status"
                  options={Array.from(uniqueValues.status)}
                />
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Assigned Staff
                <FilterDropdown column="Staff" />
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Care Pathway
                <FilterDropdown
                  column="CarePathway"
                  options={Array.from(uniqueValues.careathway)}
                />
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Progress
                <FilterDropdown column="Progress" />
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block w-6 h-6 rounded-full ${
                      patient.triagelevel === "I"
                        ? "bg-red-500"
                        : patient.triagelevel === "II"
                        ? "bg-orange-500"
                        : "bg-yellow-500"
                    } text-white text-center`}
                  >
                    {patient.triagelevel}
                  </span>
                </TableCell>
                <TableCell>{patient.time}</TableCell>
                <TableCell>{patient.status}</TableCell>
                <TableCell>{patient.staff}</TableCell>
                <TableCell>{patient.careathway}</TableCell>
                <TableCell>{patient.progress}</TableCell>
                <TableCell>
                  <Button size="sm">Select</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
