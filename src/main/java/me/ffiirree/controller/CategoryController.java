package me.ffiirree.controller;

import me.ffiirree.mapper.CategoryMapper;
import me.ffiirree.model.Category;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
@RequestMapping(value = "/category")
public class CategoryController {
    @Resource private CategoryMapper categoryService;

    @RequestMapping(value = "all", method = POST)
    public @ResponseBody HashMap<String, Object> all() {
        return new HashMap<String, Object>(){{
            put("status", "success");
            put("categories", categoryService.all());
        }};
    }

    @RequestMapping(value = "top_all", method = POST)
    public @ResponseBody HashMap<String, Object> top_all() {
        return new HashMap<String, Object>(){{
            put("status", "success");
            put("categories", categoryService.top_all());
        }};
    }


    @RequestMapping(value = "/insert", method = POST)
    @ResponseBody
    public HashMap<String, Object> insert(@RequestParam(value = "name")String name,
                                          @RequestParam(value = "parent_id", defaultValue = "0")Long parent_id){

        Category category = new Category(parent_id, name);
        category.setPosition(categoryService.last_postion() + 1);
        categoryService.insert(category);

        final Category categoryFinal = category;
        return new HashMap<String, Object>(){{
            put("category", categoryFinal);
            put("status", "success");
        }};
    }

    @RequestMapping(value = "/delete", method = POST)
    @ResponseBody
    public HashMap<String, Object> delete(@RequestParam("id") Long id) {
        categoryService.delete(id);
        return new HashMap<String, Object>(){{
            put("status", "success");
        }};
    }

    @RequestMapping(value = "/update/name", method=POST)
    @ResponseBody
    public HashMap<String, Object> update_name(@RequestParam("id") Long id,
                                               @RequestParam("name")String name) {
        categoryService.update_name(id, name);
        return new HashMap<String, Object>(){{
            put("status", "success");
        }};
    }

    @RequestMapping(value = "/update/parent_id", method=POST)
    @ResponseBody
    public HashMap<String, Object> update_parent_id(@RequestParam("id") Long id,
                                               @RequestParam("parent_id")Long parent_id) {
        categoryService.update_parent_id(id, parent_id);
        return new HashMap<String, Object>(){{
            put("status", "success");
        }};
    }

    @RequestMapping(value = "/update/position", method=POST)
    @ResponseBody
    public HashMap<String, Object> update_position(@RequestParam("id") Long id,
                                                   @RequestParam("name")Long position) {

        Category category_1 = categoryService.getByPosition(position);
        Category category_2 = categoryService.select(id);
        if(category_1!=null) {
            Long pos = category_2.getPosition();
            categoryService.update_position(category_1.getId(), 0L);
            categoryService.update_position(id, position);
            categoryService.update_position(category_1.getId(), pos);
        }
        else {
            categoryService.update_position(id, position);
        }


        return new HashMap<String, Object>(){{
            put("status", "success");
        }};
    }

}
