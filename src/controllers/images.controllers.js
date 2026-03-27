import Puter from '../PuterClient.js';
import config from '../config/config.js';

const { model, provider } = config;

const testMode = process.env.IMAGE_TEST_MODE || false;
const disableSafetyChecker = true;
const negativePrompt =
    'ugly, deformed, disfigured, mutated, extra limbs,blurry, low quality, cartoon, anime, painting, bad anatomy, bad eyes, neon, overexposed, psychedelic';

const generateImage = async (req, res, next) => {
    const prompt = req.body.prompt;

    if (!prompt) {
        const error = new Error('Prompt is required');
        error.statusCode = 400;
        next(error);
    }

    let image;

    switch (config.provider) {
        case 'google': {
            const ratio = { w: 1024, h: 1024 };
            try {
                image = await Puter.ai.txt2img(prompt, {
                    provider,
                    model,
                    ratio,
                    test_mode: testMode
                });
            } catch (err) {
                err.statusCode = 500;
                next(err);
            }
            break;
        }
        case 'openai': {
            const quality = req.body.quality || 'standard';
            const ratio = req.body.ratio || { w: 1024, h: 1024 };
            try {
                image = await Puter.ai.txt2img(prompt, {
                    provider,
                    model,
                    quality,
                    ratio,
                    test_mode: testMode
                });
            } catch (err) {
                err.statusCode = 500;
                next(err);
            }
            break;
        }

         case 'togetherai': {
            const width = req.body.width || 1024;
            const height = req.body.height || 768;
            const num_steps = req.body.num_steps || 30;
            const guidance = req.body.guidance || 7.5;
            const seed = req.body.seed || 12345;
            const negative_prompt = req.body.negative_prompt || negativePrompt;
            try {
                image = await Puter.ai.txt2img(prompt, {
                    provider,
                    model,
                    width,
                    height,
                    num_steps,
                    guidance,
                    seed,
                    negative_prompt,
                    disable_safety_checker: disableSafetyChecker,
                    test_mode: testMode
                });
            } catch (err) {
                err.statusCode = 500;
                next(err);
            }
            break;
        }

        case 'workers-ai': {
            const width = req.body.width || 1024;
            const height = req.body.height || 768;
            const num_steps = req.body.num_steps || 30;
            const guidance = req.body.guidance || 7.5;
            const seed = req.body.seed || 12345;
            const negative_prompt = req.body.negative_prompt || negativePrompt;
            try {
                image = await Puter.ai.txt2img(prompt, {
                    provider,
                    model,
                    width,
                    height,
                    num_steps,
                    guidance,
                    seed,
                    negative_prompt,
                    disable_safety_checker: disableSafetyChecker,
                    test_mode: testMode
                });
            } catch (err) {
                err.statusCode = 500;
                next(err);
            }
            break;
        }

        case 'x-ai': {
            try {
                image = await Puter.ai.txt2img(prompt, {
                    provider,
                    model,
                    test_mode: testMode
                });
            } catch (err) {
                err.statusCode = 500;
                next(err);
            }
            break;
        }
    }

    const dataUrl = image.src;
    const base64Data = dataUrl.split(',').pop();

    return res.status(200).json({
        status: 'success',
        base64Data,
        mimeType: 'image/png'
    });
};

export { generateImage };
