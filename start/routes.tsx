/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { resolvePage } from '../lib/pageResolver.js'

router.get('*', async (ctx) => resolvePage(ctx, 'GET'))
router.post('*', async (ctx) => resolvePage(ctx, 'POST'))

