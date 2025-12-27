import { Download, Upload } from "lucide-react";
import { useState, useCallback } from "react";
import Papa from "papaparse";
import { Job, JobWithUI } from "../types";

interface CSVUploadSectionProps {
  onImport: (jobs: JobWithUI[]) => void;
}

/* ================= TYPES ================= */

type CSVRow = {
  title?: string;
  description?: string;
  company?: string;
  location?: string;
  creation?: string;
  salary?: string;
  experience?: string;
  salaryCurrency?: string;
  tags?: string;
  type?: "remote" | "on_site";
  url?: string;
  contactEmail?: string;
};

interface ParsedRow {
  data: CSVRow;
  isValid: boolean;
  errors: string[];
  index: number;
}

/* ================= COMPONENT ================= */

export const UploadBulk = ({ onImport }: CSVUploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [filterColumn, setFilterColumn] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const [header, setHeader] = useState<string[]>([]);

  /* ================= VALIDATION ================= */

  const validateRow = (row: any, index: number): ParsedRow => {
    const errors: string[] = [];

    if (!row.title?.trim()) errors.push("Title is required");
    // if (!row.contactEmail?.trim()) errors.push("Contact email is required");
    // if (!row.salaryCurrency?.trim()) errors.push("Salary currency is required");
    // if (!row.tags?.trim()) errors.push("Tags are required");

    // if (row.type !== "remote" && row.type !== "on_site") {
    //   errors.push("Type must be remote or on_site");
    // }

    return {
      data: row,
      isValid: errors.length === 0,
      errors,
      index,
    };
  };

  /* ================= CSV → JOB ================= */

  const mapRowToJob = (row: CSVRow): Job => ({
    title: row.title?.trim() || "",
    description: row.description || "",
    company: row.company || "",
    location: row.location || "",
    creation: row.creation ? new Date(row.creation) : new Date(),
    salary: row.salary ? Number(row.salary) : undefined,
    experience: row.experience || "",
    salaryCurrency: row.salaryCurrency || "",
    tags: row.tags || "",
    type: row.type === "remote" ? "remote" : "on_site",
    url: row.url || "",
    contactEmail: row.contactEmail || "",
  });

  /* ================= FILE HANDLING ================= */

  const processFile = (file: File) => {
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setHeader(results.meta.fields || []);
        const validated = results.data.map((row, index) =>
          validateRow(row, index)
        );

        setParsedData(validated);

        const validIndices = new Set(
          validated.filter((r) => r.isValid).map((r) => r.index)
        );
        setSelectedRows(validIndices);
      },
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/csv") {
      processFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  /* ================= IMPORT ================= */

  const handleImport = () => {
    const jobsToImport: JobWithUI[] = parsedData
      .filter((row) => selectedRows.has(row.index) && row.isValid)
      .map((row) => ({
        key: crypto.randomUUID(),
        job: mapRowToJob(row.data),
      }));

    onImport(jobsToImport);
    setParsedData([]);
    setSelectedRows(new Set());
  };

  const toggleRow = (index: number) => {
    const newSelected = new Set(selectedRows);
    newSelected.has(index) ? newSelected.delete(index) : newSelected.add(index);
    setSelectedRows(newSelected);
  };

  /* ================= FILTER ================= */

  const filteredData = parsedData.filter((row) => {
    if (filterColumn === "all") return true;
    if (filterColumn === "valid") return row.isValid;
    if (filterColumn === "invalid") return !row.isValid;
    if (filterValue) {
      const value =
        row.data[filterColumn as keyof CSVRow]?.toString().toLowerCase() || "";
      return value.includes(filterValue.toLowerCase());
    }
    return true;
  });

  /* ================= TEMPLATE ================= */

  const downloadTemplate = () => {
    const template =
      "title,description,company,location,creation,salary,experience,salaryCurrency,tags,type,url,contactEmail\n" +
      'Senior Software Engineer,"Build scalable systems","Acme Inc","Remote",2024-01-01,120000,"5+ years","USD","react,node","remote","https://example.com","hr@acme.com"\n' +
      'Product Designer,"Design UX","DesignCo","New York",2024-01-01,90000,"3+ years","USD","figma,ui","on_site","","jobs@designco.com"';

    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "job_template.csv";
    a.click();
  };

  /* ================= UI ================= */

  console.log("seleted rows", selectedRows);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            CSV/Excel Upload
          </h2>
          <button
            onClick={downloadTemplate}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center gap-2 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Download Template
          </button>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
              : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
          }`}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
            Drop CSV file here or click to browse
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Supports CSV files with headers: title, description, category,
            location, etc.
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
          >
            Choose File
          </label>
        </div>
      </div>

      {/* Preview Table */}
      {parsedData.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Preview & Validate
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {selectedRows.size} of {parsedData.length} rows selected
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={filterColumn}
                onChange={(e) => setFilterColumn(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              >
                <option value="all">All Rows</option>
                <option value="valid">Valid Only</option>
                <option value="invalid">Invalid Only</option>
                <option value="title">Filter by Title</option>
                <option value="category">Filter by Category</option>
                <option value="status">Filter by Status</option>
              </select>

              {filterColumn !== "all" &&
                filterColumn !== "valid" &&
                filterColumn !== "invalid" && (
                  <input
                    type="text"
                    placeholder={`Search ${filterColumn}...`}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                )}

              <button
                onClick={handleImport}
                disabled={selectedRows.size === 0}
                className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white flex items-center gap-2 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Import Selected ({selectedRows.size})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.size ===
                        parsedData.filter((r) => r.isValid).length
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(
                            new Set(
                              parsedData
                                .filter((r) => r.isValid)
                                .map((r) => r.index)
                            )
                          );
                        } else {
                          setSelectedRows(new Set());
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                  {header.map((col) => (
                    <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr
                    key={row.index}
                    className={`border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                      !row.isValid ? "bg-red-50 dark:bg-red-900/10" : ""
                    }`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.index)}
                        onChange={() => toggleRow(row.index)}
                        disabled={!row.isValid}
                        className="rounded"
                      />
                    </td>

                    <td className="py-3 px-4 text-slate-900 dark:text-white">
                      {row.data.title || "—"}
                    </td>

                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {row.data.location || "—"}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {row.data.salary && row.data.salary
                        ? `$${parseInt(
                            row.data.salary
                          ).toLocaleString()} - $${parseInt(
                            row.data.salary
                          ).toLocaleString()}`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
