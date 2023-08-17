<template>
    <nav>
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Dead By Daylight Loadout Builder</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'home' }">
                <span>Home</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'perks' }">
                <span>Perks</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'survivors' }">
                <span>Survivors</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'killers' }">
                <span>Killers</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>