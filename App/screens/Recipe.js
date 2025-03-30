//Chandler: Made Recipe Detail Screen
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const recipeDetails = {
    '1': {
        title: 'Zucchini Noodles with Pesto',
        ingredients: [
            '2 medium zucchinis',
            '1/2 cup pesto sauce',
            '1/4 cup grated Parmesan cheese',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Spiralize the zucchinis to create noodles.',
            'Heat a skillet over medium heat and add the zucchini noodles.',
            'Cook for 3-4 minutes, stirring occasionally, until tender.',
            'Remove from heat and toss with pesto sauce.',
            'Season with salt and pepper and sprinkle with Parmesan cheese before serving.'
        ],
        imageUri: require('../assets/Images/zucchini noodles with pesto.jpg')
    },
    '2': {
        title: 'Overnight Oats',
        ingredients: [
            '1/2 cup rolled oats',
            '1/2 cup milk or almond milk',
            '1/4 cup Greek yogurt',
            '1 tbsp chia seeds',
            '1 tbsp honey or maple syrup',
            '1/2 cup mixed berries'
        ],
        instructions: [
            'In a mason jar or bowl, combine oats, milk, yogurt, chia seeds, and honey.',
            'Stir well to combine.',
            'Cover and refrigerate overnight.',
            'In the morning, top with mixed berries and enjoy.'
        ],
        imageUri: require('../assets/Images/Overnight Oats.png')
    },
    '3': {
        title: 'Grilled Chicken Breast',
        ingredients: [
            '2 boneless, skinless chicken breasts',
            '1 tbsp olive oil',
            '1 tsp garlic powder',
            '1 tsp paprika',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Preheat grill to medium-high heat.',
            'Brush chicken breasts with olive oil and season with garlic powder, paprika, salt, and pepper.',
            'Grill chicken for 6-7 minutes on each side, or until cooked through.',
            'Remove from grill and let rest for 5 minutes before slicing and serving.'
        ],
        imageUri: require('../assets/Images/grilled chicken breast.jpg')
    },
    '4': {
        title: 'Protein Pancakes',
        ingredients: [
            '1 cup rolled oats',
            '1 cup cottage cheese',
            '1 cup egg whites',
            '1 tsp vanilla extract',
            '1/2 tsp baking powder',
            '1/2 tsp ground cinnamon'
        ],
        instructions: [
            'In a blender, combine all ingredients and blend until smooth.',
            'Heat a non-stick skillet over medium heat and spray with cooking spray.',
            'Pour 1/4 cup of batter onto the skillet and cook until bubbles form on the surface, then flip and cook until golden brown on the other side.',
            'Repeat with remaining batter.',
            'Serve with fresh fruit and a drizzle of maple syrup.'
        ],
        imageUri: require('../assets/Images/Protein-pancakes-b64bd40.jpg')
    },
    '5': {
        title: 'Turkey and Sweet Potato Hash',
        ingredients: [
            '1 lb ground turkey',
            '2 large sweet potatoes, peeled and diced',
            '1 red bell pepper, diced',
            '1 green bell pepper, diced',
            '1/2 yellow onion, diced',
            '2 cloves garlic, minced',
            '1 tsp paprika',
            '1/2 tsp cumin',
            'Salt and pepper to taste',
            '2 tbsp olive oil'
        ],
        instructions: [
            'Heat olive oil in a large skillet over medium heat. Add diced sweet potatoes and cook until tender, about 10 minutes.',
            'Add ground turkey, bell peppers, onion, and garlic to the skillet. Cook until the turkey is browned and cooked through.',
            'Season with paprika, cumin, salt, and pepper.',
            'Serve hot.'
        ],
        imageUri: require('../assets/Images/TurkeyHash.jpg')
    },
    '6': {
        title: 'Cottage Cheese with Pineapple and Walnuts',
        ingredients: [
            '1 cup cottage cheese',
            '1/2 cup pineapple chunks',
            '1/4 cup chopped walnuts',
            'Honey (optional)'
        ],
        instructions: [
            'In a bowl, combine cottage cheese, pineapple chunks, and chopped walnuts.',
            'Drizzle with honey if desired.',
            'Serve immediately.'
        ],
        imageUri: require('../assets/Images/cottage cheese.jpg')
    },
    '7': {
        title: 'Stuffed Bell Peppers',
        ingredients: [
            '4 bell peppers, tops cut off and seeds removed',
            '1 lb ground beef',
            '1 cup cooked rice',
            '1 can diced tomatoes',
            '1/2 cup shredded cheese',
            '1/2 onion, diced',
            '2 cloves garlic, minced',
            '1 tsp Italian seasoning',
            'Salt and pepper to taste',
            'Olive oil'
        ],
        instructions: [
            'Preheat oven to 375°F (190°C).',
            'In a skillet, heat olive oil over medium heat. Add diced onion and garlic and cook until softened.',
            'Add ground beef to the skillet and cook until browned. Drain excess fat.',
            'Stir in cooked rice, diced tomatoes, Italian seasoning, salt, and pepper.',
            'Stuff each bell pepper with the beef and rice mixture.',
            'Place stuffed peppers in a baking dish and cover with foil. Bake for 30 minutes.',
            'Remove foil, top with shredded cheese, and bake for an additional 10 minutes, or until cheese is melted and peppers are tender.',
            'Serve hot.'
        ],
        imageUri: require('../assets/Images/stuffed peppers.jpg')
    },
    '8': {
        title: 'Protein Smoothie Bowl',
        ingredients: [
            '1 cup frozen mixed berries',
            '1 banana',
            '1/2 cup Greek yogurt',
            '1/2 cup almond milk',
            '1 scoop protein powder',
            '1 tbsp chia seeds',
            '1/4 cup granola',
            'Fresh fruit and nuts for topping'
        ],
        instructions: [
            'In a blender, combine frozen berries, banana, Greek yogurt, almond milk, and protein powder. Blend until smooth.',
            'Pour smoothie into a bowl and top with chia seeds, granola, fresh fruit, and nuts.',
            'Serve immediately.'
        ],
        imageUri: require('../assets/Images/smoothie bowl.jpg')
    },
    '9': {
        title: 'Avocado Salad',
        ingredients: [
            '2 ripe avocados, diced',
            '1 cup cherry tomatoes, halved',
            '1/4 red onion, thinly sliced',
            '1/4 cup fresh cilantro, chopped',
            'Juice of 1 lime',
            'Salt and pepper to taste'
        ],
        instructions: [
            'In a large bowl, combine diced avocados, cherry tomatoes, red onion, and cilantro.',
            'Drizzle with lime juice and season with salt and pepper.',
            'Gently toss to combine.',
            'Serve immediately.'
        ],
        imageUri: require('../assets/Images/avocadosalad.jpg')
    },
    '10': {
        title: 'Grilled Salmon with Asparagus',
        ingredients: [
            '2 salmon fillets',
            '1 bunch asparagus, trimmed',
            '2 tbsp olive oil',
            '1 lemon, sliced',
            '2 cloves garlic, minced',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Preheat grill to medium-high heat.',
            'Brush salmon fillets and asparagus with olive oil and season with salt, pepper, and minced garlic.',
            'Grill the salmon fillets for 4-5 minutes on each side, or until cooked through.',
            'Grill the asparagus for 3-4 minutes, turning occasionally, until tender.',
            'Serve salmon and asparagus with lemon slices.'
        ],
        imageUri: require('../assets/Images/salmon.jpg')
    },
    '11': {
        title: 'Kale & Quinoa Salad',
        ingredients: [
            '1 cup cooked quinoa',
            '2 cups chopped kale',
            '1/2 cup cherry tomatoes, halved',
            '1/4 cup crumbled feta cheese',
            '1/4 cup chopped walnuts',
            '2 tbsp olive oil',
            '1 tbsp balsamic vinegar',
            'Salt and pepper to taste'
        ],
        instructions: [
            'In a large bowl, combine cooked quinoa, chopped kale, cherry tomatoes, feta cheese, and walnuts.',
            'In a small bowl, whisk together olive oil, balsamic vinegar, salt, and pepper.',
            'Drizzle the dressing over the salad and toss to combine.',
            'Serve immediately.'
        ],
        imageUri: require('../assets/Images/kale.jpg')
    },
    '12': {
        title: 'Cauliflower Rice Stir-Fry',
        ingredients: [
            '1 head cauliflower, grated into rice-sized pieces',
            '2 cups mixed vegetables (carrots, peas, bell peppers)',
            '2 cloves garlic, minced',
            '2 tbsp soy sauce',
            '1 tbsp sesame oil',
            '2 green onions, sliced',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Heat sesame oil in a large skillet over medium heat. Add minced garlic and cook until fragrant.',
            'Add mixed vegetables and cook until tender, about 5-7 minutes.',
            'Stir in the grated cauliflower and cook for another 5 minutes, until tender.',
            'Add soy sauce, green onions, salt, and pepper, and stir to combine.',
            'Serve hot.'
        ],
        imageUri: require('../assets/Images/friedrice.jpg')
    },
    '13': {
        title: 'Shrimp Lettuce Wraps',
        ingredients: [
            '1 lb cooked shrimp, peeled and deveined',
            '1 head butter lettuce, leaves separated',
            '1/2 cup shredded carrots',
            '1/2 cup sliced cucumber',
            '1/4 cup chopped peanuts',
            '1/4 cup fresh cilantro, chopped',
            '2 tbsp hoisin sauce',
            '1 tbsp soy sauce',
            '1 tbsp rice vinegar',
            '1 clove garlic, minced'
        ],
        instructions: [
            'In a small bowl, whisk together hoisin sauce, soy sauce, rice vinegar, and minced garlic.',
            'In a large bowl, combine cooked shrimp, shredded carrots, sliced cucumber, and chopped peanuts.',
            'Drizzle the hoisin sauce mixture over the shrimp mixture and toss to combine.',
            'To assemble the wraps, place a spoonful of the shrimp mixture onto a lettuce leaf and top with fresh cilantro.',
            'Serve immediately.'
        ],
        imageUri: require('../assets/Images/Shrimp-Lettuce-Wraps.jpg')
    },
    '14': {
        title: 'Cucumber Noodle Salad',
        ingredients: [
            '2 large cucumbers, spiralized into noodles',
            '1/4 cup rice vinegar',
            '2 tbsp soy sauce',
            '1 tbsp sesame oil',
            '1 tbsp honey',
            '1 clove garlic, minced',
            '1/4 cup chopped peanuts',
            '2 green onions, sliced',
            '1/4 cup fresh cilantro, chopped',
            '1 tbsp sesame seeds'
        ],
        instructions: [
            'In a large bowl, combine spiralized cucumbers, chopped peanuts, green onions, cilantro, and sesame seeds.',
            'In a small bowl, whisk together rice vinegar, soy sauce, sesame oil, honey, and minced garlic.',
            'Drizzle the dressing over the cucumber noodles and toss to combine.',
            'Serve immediately.'
        ],
        imageUri: require('../assets/Images/cucumber-noodle--salad.jpg')
    },
    '15': {
        title: 'Chicken and Vegetable Soup',
        ingredients: [
            '2 boneless, skinless chicken breasts, diced',
            '4 cups chicken broth',
            '2 large carrots, diced',
            '2 celery stalks, diced',
            '1/2 onion, diced',
            '2 cloves garlic, minced',
            '1 cup diced potatoes',
            '1 cup green beans, trimmed and cut into 1-inch pieces',
            '1 tsp dried thyme',
            'Salt and pepper to taste',
            '2 tbsp olive oil'
        ],
        instructions: [
            'Heat olive oil in a large pot over medium heat. Add diced chicken and cook until browned.',
            'Add diced carrots, celery, onion, and garlic to the pot and cook until softened.',
            'Pour in chicken broth and bring to a boil.',
            'Add diced potatoes, green beans, dried thyme, salt, and pepper.',
            'Reduce heat and simmer for 20-25 minutes, until vegetables are tender.',
            'Serve hot.'
        ],
        imageUri: require('../assets/Images/Chicken-Vegetable-Soup.jpg')
    },
    '16': {
        title: 'Turkey Chili',
        ingredients: [
            '1 lb ground turkey',
            '1 can kidney beans, drained and rinsed',
            '1 can black beans, drained and rinsed',
            '1 can diced tomatoes',
            '1 can tomato sauce',
            '1/2 onion, diced',
            '1 green bell pepper, diced',
            '2 cloves garlic, minced',
            '1 tbsp chili powder',
            '1 tsp cumin',
            'Salt and pepper to taste',
            '2 tbsp olive oil'
        ],
        instructions: [
            'Heat olive oil in a large pot over medium heat. Add ground turkey and cook until browned.',
            'Add diced onion, green bell pepper, and minced garlic to the pot and cook until softened.',
            'Stir in chili powder, cumin, salt, and pepper.',
            'Add kidney beans, black beans, diced tomatoes, and tomato sauce to the pot.',
            'Bring to a boil, then reduce heat and simmer for 30-40 minutes, stirring occasionally.',
            'Serve hot.'
        ],
        imageUri: require('../assets/Images/Easy-Turkey-Chili.webp')
    },
    '17': {
        title: 'Chickpea Curry',
        ingredients: [
            '2 cans chickpeas, drained and rinsed',
            '1 can coconut milk',
            '1 can diced tomatoes',
            '1 onion, diced',
            '2 cloves garlic, minced',
            '1 tbsp curry powder',
            '1 tsp ground cumin',
            '1 tsp ground turmeric',
            '1/2 tsp ground cinnamon',
            'Salt and pepper to taste',
            '2 tbsp olive oil',
            'Fresh cilantro, chopped, for garnish'
        ],
        instructions: [
            'Heat olive oil in a large pot over medium heat. Add diced onion and minced garlic and cook until softened.',
            'Stir in curry powder, ground cumin, ground turmeric, ground cinnamon, salt, and pepper.',
            'Add chickpeas, coconut milk, and diced tomatoes to the pot. Bring to a boil.',
            'Reduce heat and simmer for 20-25 minutes, until the sauce has thickened.',
            'Serve hot, garnished with chopped fresh cilantro.'
        ],
        imageUri: require('../assets/Images/chickpea.jpg')
    },
    '18': {
        title: 'Vegan Tacos',
        ingredients: [
            '1 can black beans, drained and rinsed',
            '1 cup corn kernels, fresh or frozen',
            '1 red bell pepper, diced',
            '1/2 red onion, diced',
            '1 avocado, diced',
            '1/4 cup fresh cilantro, chopped',
            'Juice of 1 lime',
            '1 tsp chili powder',
            '1/2 tsp ground cumin',
            'Salt and pepper to taste',
            '8 small corn tortillas'
        ],
        instructions: [
            'In a large bowl, combine black beans, corn kernels, diced red bell pepper, diced red onion, diced avocado, and chopped fresh cilantro.',
            'Drizzle with lime juice and season with chili powder, ground cumin, salt, and pepper. Toss to combine.',
            'Warm the corn tortillas in a dry skillet over medium heat.',
            'To assemble the tacos, spoon the black bean and corn mixture onto the tortillas.',
            'Serve immediately.'
        ],
        imageUri: require('../assets/Images/vegantacos.jpg')
    },
    '19': {
        title: 'Lentil Soup',
        ingredients: [
            '1 cup dried lentils, rinsed',
            '4 cups vegetable broth',
            '1 can diced tomatoes',
            '2 large carrots, diced',
            '2 celery stalks, diced',
            '1 onion, diced',
            '2 cloves garlic, minced',
            '1 tsp dried thyme',
            '1 tsp ground cumin',
            'Salt and pepper to taste',
            '2 tbsp olive oil'
        ],
        instructions: [
            'Heat olive oil in a large pot over medium heat. Add diced onion, carrots, celery, and minced garlic and cook until softened.',
            'Stir in dried thyme, ground cumin, salt, and pepper.',
            'Add rinsed lentils, vegetable broth, and diced tomatoes to the pot. Bring to a boil.',
            'Reduce heat and simmer for 25-30 minutes, until the lentils are tender.',
            'Serve hot.'
        ],
        imageUri: require('../assets/Images/lentilsoup.jpg')
    },
    '20': {
        title: 'Tofu Stir Fry',
        ingredients: [
            '1 block firm tofu, pressed and cubed',
            '2 cups mixed vegetables (broccoli, bell peppers, snap peas)',
            '2 cloves garlic, minced',
            '1/4 cup soy sauce',
            '2 tbsp hoisin sauce',
            '1 tbsp sesame oil',
            '1 tbsp cornstarch',
            '1/4 cup water',
            '2 green onions, sliced',
            '1 tbsp sesame seeds'
        ],
        instructions: [
            'In a small bowl, whisk together soy sauce, hoisin sauce, sesame oil, cornstarch, and water.',
            'Heat a large skillet over medium-high heat. Add cubed tofu and cook until golden brown on all sides. Remove from skillet and set aside.',
            'Add mixed vegetables and minced garlic to the skillet. Cook until tender, about 5-7 minutes.',
            'Return the tofu to the skillet and pour the sauce over the top. Stir to combine and cook until the sauce has thickened.',
            'Serve hot, garnished with sliced green onions and sesame seeds.'
        ],
        imageUri: require('../assets/Images/tofu stirfry.jpg')
    },
    '21': {
        title: 'Stuffed Sweet Potatoes',
        ingredients: [
            '4 medium sweet potatoes',
            '1 can black beans, drained and rinsed',
            '1 cup corn kernels, fresh or frozen',
            '1 red bell pepper, diced',
            '1/2 red onion, diced',
            '1 avocado, diced',
            '1/4 cup fresh cilantro, chopped',
            'Juice of 1 lime',
            '1 tsp chili powder',
            '1/2 tsp ground cumin',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Preheat oven to 400°F (200°C).',
            'Pierce the sweet potatoes with a fork and place them on a baking sheet.',
            'Bake for 45-50 minutes, or until tender.',
            'In a large bowl, combine black beans, corn, red bell pepper, red onion, avocado, and cilantro.',
            'Drizzle with lime juice and season with chili powder, cumin, salt, and pepper. Toss to combine.',
            'Once the sweet potatoes are done, let them cool slightly, then slice them open and fluff the insides with a fork.',
            'Spoon the black bean mixture into the sweet potatoes.',
            'Serve immediately.'
        ],
        imageUri: require('../assets/Images/stuffed sweet potatoes.jpg')
    },
    '22': {
        title: 'Vegan Buddha Bowl',
        ingredients: [
            '1 cup cooked quinoa',
            '1 cup roasted chickpeas',
            '1 cup steamed broccoli',
            '1/2 avocado, sliced',
            '1/4 cup shredded carrots',
            '1/4 cup red cabbage, thinly sliced',
            '2 tbsp tahini',
            '1 tbsp lemon juice',
            '1 clove garlic, minced',
            'Salt and pepper to taste'
        ],
        instructions: [
            'In a bowl, combine tahini, lemon juice, minced garlic, salt, and pepper. Add water as needed to reach desired consistency for dressing.',
            'In a large bowl, arrange cooked quinoa, roasted chickpeas, steamed broccoli, avocado, shredded carrots, and red cabbage.',
            'Drizzle with tahini dressing.',
            'Serve immediately.'
        ],
        imageUri: require('../assets/Images/buddha bowl.jpg')
    },
    '23': {
        title: 'Peanut Butter Energy Bites',
        ingredients: [
            '1 cup rolled oats',
            '1/2 cup peanut butter',
            '1/4 cup honey or maple syrup',
            '1/4 cup chocolate chips',
            '1/4 cup ground flaxseed',
            '1/2 tsp vanilla extract'
        ],
        instructions: [
            'In a large bowl, combine all ingredients and mix well.',
            'Roll the mixture into small balls and place on a baking sheet.',
            'Refrigerate for at least 30 minutes, or until firm.',
            'Serve immediately or store in an airtight container in the refrigerator for up to one week.'
        ],
        imageUri: require('../assets/Images/energy bites.jpg')
    },
    '24': {
        title: 'Vegan Mushroom Stroganoff',
        ingredients: [
            '1 lb mushrooms, sliced',
            '1 onion, diced',
            '2 cloves garlic, minced',
            '1 cup vegetable broth',
            '1 cup coconut milk',
            '2 tbsp soy sauce',
            '1 tbsp Dijon mustard',
            '1 tbsp cornstarch',
            '1/4 cup water',
            'Salt and pepper to taste',
            '2 tbsp olive oil',
            'Fresh parsley, chopped, for garnish'
        ],
        instructions: [
            'In a small bowl, whisk together cornstarch and water to create a slurry. Set aside.',
            'Heat olive oil in a large skillet over medium heat. Add diced onion and minced garlic and cook until softened.',
            'Add sliced mushrooms and cook until they release their moisture and are browned.',
            'Stir in vegetable broth, coconut milk, soy sauce, and Dijon mustard. Bring to a simmer.',
            'Add the cornstarch slurry to the skillet and stir until the sauce thickens.',
            'Season with salt and pepper to taste.',
            'Serve hot, garnished with chopped fresh parsley.'
        ],
        imageUri: require('../assets/Images/mushroom stroganoff.jpg')
    },
    '25': {
        title: 'Bacon-wrapped Steak',
        ingredients: [
            '2 steaks (your choice of cut)',
            '4 slices bacon',
            '1 tbsp olive oil',
            '2 cloves garlic, minced',
            'Salt and pepper to taste',
            'Fresh thyme, for garnish'
        ],
        instructions: [
            'Preheat oven to 400°F (200°C).',
            'Wrap each steak with 2 slices of bacon and secure with toothpicks.',
            'Heat olive oil in a large oven-safe skillet over medium-high heat. Add minced garlic and cook until fragrant.',
            'Sear the steaks for 2-3 minutes on each side, until browned.',
            'Transfer the skillet to the preheated oven and cook for an additional 5-7 minutes, or until the steaks reach your desired level of doneness.',
            'Remove from oven and let rest for 5 minutes before serving.',
            'Garnish with fresh thyme.'
        ],
        imageUri: require('../assets/Images/bacon steak.webp')
    },
    '26': {
        title: 'Beef Liver Stir Fry',
        ingredients: [
            '1 lb beef liver, thinly sliced',
            '2 cups mixed vegetables (bell peppers, broccoli, snap peas)',
            '2 cloves garlic, minced',
            '1/4 cup soy sauce',
            '2 tbsp hoisin sauce',
            '1 tbsp sesame oil',
            '1 tbsp cornstarch',
            '1/4 cup water',
            '2 green onions, sliced',
            '1 tbsp sesame seeds'
        ],
        instructions: [
            'In a small bowl, whisk together soy sauce, hoisin sauce, sesame oil, cornstarch, and water.',
            'Heat a large skillet over medium-high heat. Add sliced beef liver and cook until browned. Remove from skillet and set aside.',
            'Add mixed vegetables and minced garlic to the skillet. Cook until tender, about 5-7 minutes.',
            'Return the beef liver to the skillet and pour the sauce over the top. Stir to combine and cook until the sauce has thickened.',
            'Serve hot, garnished with sliced green onions and sesame seeds.'
        ],
        imageUri: require('../assets/Images/beef stirfry.jpg')
    },
    '27': {
        title: 'Roast Pork Belly',
        ingredients: [
            '2 lbs pork belly, scored',
            '1 tbsp olive oil',
            '2 cloves garlic, minced',
            '1 tsp salt',
            '1/2 tsp black pepper',
            '1 tsp dried thyme',
            '1/2 cup chicken broth'
        ],
        instructions: [
            'Preheat oven to 450°F (230°C).',
            'Rub the pork belly with olive oil, minced garlic, salt, black pepper, and dried thyme.',
            'Place the pork belly on a roasting rack set inside a baking dish.',
            'Roast in the preheated oven for 30 minutes, then reduce the oven temperature to 325°F (165°C).',
            'Pour chicken broth into the baking dish and continue to roast for an additional 1.5-2 hours, or until the pork is tender and the skin is crispy.',
            'Let rest for 10 minutes before slicing and serving.'
        ],
        imageUri: require('../assets/Images/pork belly.avif')
    },
    '28': {
        title: 'Grilled Lamb Chops',
        ingredients: [
            '8 lamb chops',
            '2 tbsp olive oil',
            '2 cloves garlic, minced',
            '1 tsp dried rosemary',
            'Salt and pepper to taste',
            'Lemon wedges, for serving'
        ],
        instructions: [
            'Preheat grill to medium-high heat.',
            'In a small bowl, combine olive oil, minced garlic, dried rosemary, salt, and pepper.',
            'Brush the lamb chops with the olive oil mixture.',
            'Grill the lamb chops for 3-4 minutes on each side, or until they reach your desired level of doneness.',
            'Serve hot with lemon wedges.'
        ],
        imageUri: require('../assets/Images/lamb chops.jpg')
    },
    '29': {
        title: 'Slow-Cooked Short Ribs',
        ingredients: [
            '3 lbs beef short ribs',
            '1 onion, diced',
            '2 cloves garlic, minced',
            '1 cup beef broth',
            '1 cup red wine',
            '1/4 cup soy sauce',
            '2 tbsp tomato paste',
            '1 tsp dried thyme',
            'Salt and pepper to taste',
            '2 tbsp olive oil'
        ],
        instructions: [
            'Heat olive oil in a large skillet over medium-high heat. Add short ribs and sear on all sides until browned. Transfer to a slow cooker.',
            'Add diced onion and minced garlic to the skillet and cook until softened.',
            'Stir in beef broth, red wine, soy sauce, tomato paste, dried thyme, salt, and pepper.',
            'Pour the mixture over the short ribs in the slow cooker.',
            'Cover and cook on low for 6-8 hours, or until the meat is tender and falling off the bone.',
            'Serve hot.'
        ],
        imageUri: require('../assets/Images/slow cooked ribs.jpg')
    },
    '30': {
        title: 'Duck Breast with Orange Glaze',
        ingredients: [
            '4 duck breasts, scored',
            '1/2 cup orange juice',
            '1/4 cup honey',
            '2 tbsp soy sauce',
            '1 tbsp rice vinegar',
            '1 clove garlic, minced',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Preheat oven to 400°F (200°C).',
            'In a small bowl, whisk together orange juice, honey, soy sauce, rice vinegar, minced garlic, salt, and pepper.',
            'Heat a large oven-safe skillet over medium-high heat. Add duck breasts, skin-side down, and sear for 5-7 minutes, until the skin is crispy.',
            'Flip the duck breasts and pour the orange glaze over them.',
            'Transfer the skillet to the preheated oven and cook for an additional 5-7 minutes, or until the duck reaches your desired level of doneness.',
            'Remove from oven and let rest for 5 minutes before serving.'
        ],
        imageUri: require('../assets/Images/duck breast orange.jpg')
    },
    '31': {
        title: 'Chicken Thighs in Creamy Garlic Sauce',
        ingredients: [
            '6 boneless, skinless chicken thighs',
            '1/2 cup heavy cream',
            '1/2 cup chicken broth',
            '1/4 cup grated Parmesan cheese',
            '2 cloves garlic, minced',
            '1 tbsp olive oil',
            'Salt and pepper to taste',
            'Fresh parsley, chopped, for garnish'
        ],
        instructions: [
            'Heat olive oil in a large skillet over medium-high heat. Add chicken thighs and cook until browned on both sides. Remove from skillet and set aside.',
            'Add minced garlic to the skillet and cook until fragrant.',
            'Stir in heavy cream, chicken broth, and grated Parmesan cheese. Bring to a simmer.',
            'Return the chicken thighs to the skillet and cook until the sauce has thickened and the chicken is cooked through.',
            'Season with salt and pepper to taste.',
            'Serve hot, garnished with chopped fresh parsley.'
        ],
        imageUri: require('../assets/Images/chicken thighs in garlic sauce.jpg')
    },
    '32': {
        title: 'Smoked Sausage and Cabbage Stir Fry',
        ingredients: [
            '1 lb smoked sausage, sliced',
            '1 small head cabbage, shredded',
            '1 onion, sliced',
            '2 cloves garlic, minced',
            '2 tbsp soy sauce',
            '1 tbsp apple cider vinegar',
            'Salt and pepper to taste',
            '2 tbsp olive oil'
        ],
        instructions: [
            'Heat olive oil in a large skillet over medium-high heat. Add sliced sausage and cook until browned. Remove from skillet and set aside.',
            'Add sliced onion and minced garlic to the skillet and cook until softened.',
            'Stir in shredded cabbage, soy sauce, and apple cider vinegar. Cook until the cabbage is tender.',
            'Return the sausage to the skillet and stir to combine.',
            'Season with salt and pepper to taste.',
            'Serve hot.'
        ],
        imageUri: require('../assets/Images/sausage and cabbage stir fry.jpg')
    },
};

export default function RecipeDetailScreen({ route }) {
    const { recipeId } = route.params;
    const recipe = recipeDetails[recipeId];

    return (
        <ScrollView style={styles.container}>
            <Image source={recipe.imageUri} style={styles.image} />
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.subtitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.text}>{ingredient}</Text>
            ))}
            <Text style={styles.subtitle}>Instructions</Text>
            {recipe.instructions.map((instruction, index) => (
                <Text key={index} style={styles.text}>{instruction}</Text>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
});