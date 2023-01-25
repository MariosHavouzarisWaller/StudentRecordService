import { Link } from "react-router-dom"

export const Wrapper = props => {
    return <>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">Student Record Service</a>

    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3">Marios Havouzaris-Waller</a>
      </div>
    </div>
  </header>

  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3 sidebar-sticky">
          <ul class="nav flex-column">
            <li class="nav-item">
              <Link to={'/studentslist'}>
                <a class="nav-link active" aria-current="page" href="#">
                  <span data-feather="home" class="align-text-bottom"></span>
                  Students
                </a>
              </Link>
            </li>
            <li class="nav-item">
            <Link to={'/subjectslist'}>
                <a class="nav-link active" aria-current="page" href="#">
                  <span data-feather="home" class="align-text-bottom"></span>
                  Subjects
                </a>
              </Link>
            </li>
            <li class="nav-item">
            <Link to={'/studentsrecordslist'}>
                <a class="nav-link active" aria-current="page" href="#">
                  <span data-feather="home" class="align-text-bottom"></span>
                  Student Records
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        {props.children}
      </main>
    </div>
  </div>
  </>
}