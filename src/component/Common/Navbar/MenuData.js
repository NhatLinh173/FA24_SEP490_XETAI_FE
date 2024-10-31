export const getMenuData = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const MenuData = [
    {
      name: "Trang chủ",
      href: "/",
      has_children: false,
    },
    {
      name: "Đơn Hàng",
      href: "/order",
      has_children: false,
    },
    {
      name: "Tin tức",
      href: "/blog_details",
      has_children: false,
    },
    {
      name: "Liên Hệ ",
      href: "/contact",
      has_children: false,
    },
    {
      name: isLoggedIn ? "" : "Đăng Nhập",
      href: isLoggedIn ? "#" : "/signIn",
      has_children: false,
    },
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
