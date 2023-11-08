export const navOptions = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "listing",
    label: "Todos os produtos",
    path: "/product/listing/all-products",
  },
  {
    id: "listingSaude",
    label: "Saúde",
    path: "/product/listing/Saude",
  },
  {
    id: "listingBelezaa",
    label: "Beleza",
    path: "/product/listing/Beleza",
  },
  {
    id: "listingHomem",
    label: "Homem",
    path: "/product/listing/Homem",
  },
  {
    id: "listingMulher",
    label: "Mulher",
    path: "/product/listing/Mulher",
  },
];

export const adminNavOptions = [
  {
    id: "adminListing",
    label: "Manage All Products",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Add New Product",
    path: "/admin-view/add-product",
  },
  {
    id: "adminAddAdmin",
    label: "Add Admin",
    path: "/admin-view/add-admin",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
  {
    id: "nif",
    type: "text",
    placeholder: "Enter your NIF number",
    label: "NIF",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "Admin",
      },
      {
        id: "customer",
        label: "customer",
      },
    ],
  },
];
export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];
export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "homem",
        label: "Homem",
      },
      {
        id: "mulher",
        label: "Mulher",
      },
      {
        id: "beleza",
        label: "Beleza",
      },
      {
        id: "saude",
        label: "Saúde",
      },
    ],
  },
  {
    id: "size",
    type: "text",
    placeholder: "quantidade",
    label: "quantidade",
    componentType: "input",
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter deliveryInfo",
    label: "Delivery Info",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "Promoção",
    componentType: "select",
    options: [
      {
        id: "sim",
        label: "Sim",
      },
      {
        id: "nao",
        label: "Não",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Price Drop",
    componentType: "input",
  },
];
export const adminAddAdmin = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter new admin name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter new admin email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter password",
    label: "Password",
    componentType: "input",
  },
];
