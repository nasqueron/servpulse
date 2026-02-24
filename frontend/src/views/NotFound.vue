<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="card p-8 w-full max-w-md text-center">

      <!-- 404 number -->
      <p class="text-6xl font-bold text-brand-500 mb-4">404</p>

      <!-- Headline -->
      <h1 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
        The page you're looking for can't be found.
      </h1>

      <!-- Subtext -->
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
        It may have been moved or deleted.
      </p>

      <!-- Actions -->
      <RouterLink to="/" class="btn-primary flex items-center justify-center w-full">
        Back to Home
      </RouterLink>

    </div>
  </div>
</template>
