import React from 'react'

export const Searchbar = () => {
  return (
<div>
<nav class="navbar bg-secondary-subtle">
  <div class="container-fluid">
    <a class="navbar-brand">Chats</a>
    <form class="d-flex" role="search">
      <input class="form-control form-control-sm me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-dark  btn-sm" type="submit">Search</button>
    </form>
  </div>
</nav>
</div>
  )
}
