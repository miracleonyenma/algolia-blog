---
title: Creating a Nuxt Module
description: How to create nuxt modules
tags: [nuxt, module, vue]
---

## What is a Nuxt module?

Modules are functions that are called sequentially when booting Nuxt. The framework waits for each module to finish before continuing. In this way, modules can customize almost any aspect of your project. Let's create a module that uses ngrok to get a Public URL that you can share while working in Development.
