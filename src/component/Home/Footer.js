import React from "react";
import './Footer.css';

const Footer = () => {
  return(
      <div>
          <footer className="footer-04">
              <div className="container">
                  <div className="row">
                      <div className="col-md-6 col-lg-3 mb-md-0 mb-4">
                          <h2 className="footer-heading"><a href="#" className="logo">Địa chỉ</a></h2>
                          <p>295 Nguyễn Tất Thành, Phường Hòa Cường Nam , Quận Hải Châu, Thành Phố Đà Nẵng</p>
                          <a href="https://www.google.com/maps/search/?api=1&query=295%20Nguy%E1%BB%85n%20T%E1%BA%A5t%20Th%C3%A0nh,%20Ph%C6%B0%E1%BB%9Dng%20H%C3%B2a%20C%C6%B0%E1%BB%9Dng%20Nam,%20Qu%E1%BA%ADn%20H%E1%BA%A3i%20Ch%C3%A2u,%20Th%C3%A0nh%20Ph%E1%BB%91%20%C4%90%C3%A0%20N%E1%BA%B5ng"
                             target="_blank">
                              view on Google Map <span className="ion-ios-arrow-round-forward"></span>
                          </a>
                      </div>
                      <div className="col-md-6 col-lg-3 mb-md-0 mb-4">
                          <h2 className="footer-heading">Thành Viên</h2>
                          <ul className="list-unstyled">
                              <li><a href="#" className="py-1 d-block">Lê Đăng Pháp </a></li>
                              <li><a href="#" className="py-1 d-block">Lương Văn Đạt</a></li>
                              <li><a href="#" className="py-1 d-block">Nguyễn Đăng Hải Nhật</a></li>
                              <li><a href="#" className="py-1 d-block">Phan Văn Toại</a></li>
                              <li><a href="#" className="py-1 d-block">Nguyễn Tất Quyền</a></li>
                          </ul>
                      </div>
                      <div className="col-md-6 col-lg-3 mb-md-0 mb-4">
                          <h2 className="footer-heading">Chi Nhánh</h2>
                          <div className="tagcloud">
                              <li><a href="#" className="py-1 d-block">Thành Phố Đà Nẵng </a></li>
                              <li><a href="#" className="py-1 d-block">Thủ Đô Hà Nội </a></li>
                              <li><a href="#" className="py-1 d-block">Thành Phố Hồ Chí Minh </a></li>
                          </div>
                      </div>
                      <div className="col-md-6 col-lg-3 mb-md-0 mb-4">
                          <h2 className="footer-heading">Email Liên Hệ Quảng Cáo</h2>
                          <form action="#" className="subscribe-form">
                              <div className="form-group d-flex">
                                  <input type="text" className="form-control rounded-left"
                                         placeholder="C1023H1@gmail.com"/>
                                  <button type="submit" className="form-control submit rounded-right"><span
                                      className="sr-only">Submit</span><i className="ion-ios-send"></i></button>
                              </div>
                          </form>
                          <h2 className="footer-heading mt-5">Số Khách Hàng Tin Tưởng Và Sử Dụng</h2>
                          <a style={{fontWeight: "bold", fontSize: "1.2em", color: "white"}}>1,089,333 người</a>

                      </div>
                  </div>
              </div>
              <div className="w-100 mt-5 border-top py-5">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-6 col-lg-8">

                              <p className="copyright">
                                  Copyright &copy;
                                  <script>document.write(new Date().getFullYear());</script>
                                  All rights reserved | This template is made with <i className="ion-ios-heart"
                                                                                      aria-hidden="true"></i> by <a
                                      href="https://colorlib.com" target="_blank">C1023H1</a>
                              </p>
                          </div>
                          <div className="col-md-6 col-lg-4 text-md-right">
                              <p className="mb-0 list-unstyled">
                                  <a className="mr-md-3" href="#">Terms</a>
                                  <a className="mr-md-3" href="#">Privacy</a>
                                  <a className="mr-md-3" href="#">Compliances</a>
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
      </div>
  );
}
export default Footer;
