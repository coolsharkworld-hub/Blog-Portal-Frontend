export const DESIGNATION_OPTIONS = [
  { value: "INTERN", label: "Intern" },
  { value: "SOFTWARE_ENGINEER", label: "Software Engineer" },
  { value: "SENIOR_SOFTWARE_ENGINEER", label: "Senior Software Engineer" },
  { value: "TECHNICAL_LEAD", label: "Technical Lead" },
  { value: "ARCHITECT", label: "Architect" },
  { value: "SENIOR_ARCHITECT", label: "Senior Architect" },
  { value: "DELIVERY_HEAD", label: "Delivery Head" },
  { value: "DEPARTMENT_HEAD", label: "Department Head" },
  { value: "HR", label: "HR" },
  { value: "OTHER", label: "Other" },
];

export const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export const TECHNOLOGIES_OPTIONS = [
  { value: "JAVA", label: "Java" },
  { value: "NODE_JS", label: "NodeJs" },
  { value: "BLOCKCHAIN", label: "Blockchain" },
  { value: "DATA_SCIENCE", label: "Data Science" },
  { value: "CLOUD_TECHNOLOGY", label: "Cloud Technology" },
  { value: "PYTHON", label: "Python" },
  { value: "DATA_ENGINEERING", label: "Data Engineering" },
  { value: "NOSQL", label: "NoSQL" },
  { value: "SQL_DATABASES", label: "SQL Databases" },
  { value: "REACT_JS", label: "ReactJs" },
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "MICROSERVICES", label: "Microservices" },
  { value: "DEVOPS", label: "DevOps" },
  { value: "BUSINESS_INTELLIGENCE", label: "Business Intelligence" },
  { value: "OTHERS", label: "Others" },
];

export const TECHNOLOGIES_OPTIONS_NAVBAR = [
  { value: "All", label: "All Technologies" },
  { value: "JAVA", label: "Java" },
  { value: "NODE_JS", label: "NodeJs" },
  { value: "BLOCKCHAIN", label: "Blockchain" },
  { value: "DATA_SCIENCE", label: "Data Science" },
  { value: "CLOUD_TECHNOLOGY", label: "Cloud Technology" },
  { value: "PYTHON", label: "Python" },
  { value: "DATA_ENGINEERING", label: "Data Engineering" },
  { value: "NOSQL", label: "NoSQL" },
  { value: "SQL_DATABASES", label: "SQL Databases" },
  { value: "REACT_JS", label: "ReactJs" },
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "MICROSERVICES", label: "Microservices" },
  { value: "DEVOPS", label: "DevOps" },
  { value: "BUSINESS_INTELLIGENCE", label: "Business Intelligence" },
  { value: "OTHERS", label: "Others" },
];

export const STATUS_OPTIONS_NAVBAR = [
  { value: "All", label: "All Status" },
  { value: "APPROVED", label: "Approved" },
  { value: "PENDING", label: "Pending" },
  { value: "REJECTED", label: "Rejected" },
];

export const TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ color: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
];

export const EMAIL_REGEX = "^[a-zA-Z0-9-_.]{3,}@nucleusteq.com$";

export const NAME_REGEX = "^[a-zA-Z]{3,15}$";

export const MOBILE_REGEX = "^[6789][0-9]{9}$";

export const PASSWORD_REGEX =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$";

export const BLOG_HEADING_REGEX = "^.{3,}$";
