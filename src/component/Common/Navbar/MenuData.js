export const getMenuData = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const MenuData = [
    {
      name: "Chúng Tôi",
      href: "/about",
      has_children: false,
    },
    {
      name: "Đơn Hàng",
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

    ...(!isLoggedIn
      ? [
          {
            name: "Đăng nhập",
            href: "#",
            has_children: false,
          },
        ]
      : []),
    ...(!isLoggedIn
      ? [
          {
            name: "Đăng Ký",
            href: "#",
            has_children: false,
          },
        ]
      : []),
  ];
  return MenuData;
};
