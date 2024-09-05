export const getMenuData = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const MenuData = [
    // {
    //   name: "Home",
    //   href: "/",
    //   has_children: false,
    // },
    {
      name: "Chúng Tôi",
      href: "/about",
      has_children: false,
    },
    {
      name: "Dịch Vụ",
      href: "/service",
      has_children: false,
    },
    {
      name: "Blog",
      href: "/blog_details",
      has_children: false,
    },
    {
      name: "Liên Hệ ",
      href: "/contact",
      has_children: false,
    },
    {
      name: isLoggedIn ? "Thông Tin" : "Đăng Nhập",
      href: isLoggedIn ? "/profile" : "/signIn",
      has_children: false,
    },
  ];
  if (!isLoggedIn) {
    MenuData.push({
      name: "Đăng Ký",
      href: "#",
      has_children: false,
    });
  }
  return MenuData;
};
