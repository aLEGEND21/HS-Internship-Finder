import { Link } from "react-router-dom";

interface InternshipSummaryProps {
  internship: any;
  selectedInternship: any;
  setSelectedInternship: any;
}

function InternshipSummary({
  internship,
  selectedInternship,
  setSelectedInternship,
}: InternshipSummaryProps) {
  // Format the dates
  const startDate = new Date(internship.startDate);
  const endDate = new Date(internship.endDate);
  const fmtOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const startDateString = startDate.toLocaleDateString(undefined, fmtOptions);
  const endDateString = endDate.toLocaleDateString(undefined, fmtOptions);

  return (
    <div>
      <div
        className={`hidden container px-8 pt-4 pb-7 border-b border-gray-200 lg:block xl:px-14 hover:cursor-pointer hover:bg-slate-100 ${
          selectedInternship._id === internship._id ? "bg-slate-100" : ""
        }`}
        onClick={() => setSelectedInternship(internship)}
      >
        <h1 className="font-semibold xl:text-lg">{internship.title}</h1>
        <div className="text-sm text-gray-600 xl:text-base">
          <p>{internship.companyName}</p>
          <p>{internship.location}</p>
          <p className="mt-2 xl:mt-3">
            ${internship.hourlyRate} / hr • {internship.hoursPerWeek} hr / week
          </p>
          <p>
            {startDateString} - {endDateString}
          </p>
        </div>
        <div className="mt-2 xl:mt-4">
          {internship.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-primary text-white rounded-lg px-2.5 py-1.5 text-xs me-1 whitespace-nowrap xl:text-sm xl:px-3 xl:py-2"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>
      {/* Small screen view - main page contents */}
      <Link to={`/internship/view/${internship._id}`} className="lg:hidden">
        <div className="pt-4 pb-8 px-7">
          <h1 className="text-2xl font-semibold">{internship.title}</h1>
          <h3 className="text-lg font-bold underline"></h3>
          <p className="mt-0.5 font-semibold text-gray-600">
            {selectedInternship?.companyName} • {selectedInternship?.location}
          </p>
          <p className="mt-0.5 font-semibold text-gray-600">
            ${selectedInternship?.hourlyRate} / hour •{" "}
            {selectedInternship?.hoursPerWeek} hours / week
          </p>
          <p className="mt-0.5 line-clamp-3 text-gray-600">
            {internship.description}
          </p>
          <div className="mt-4">
            {internship.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-primary text-white rounded-lg px-3 py-2 text-sm me-1 whitespace-nowrap"
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default InternshipSummary;
